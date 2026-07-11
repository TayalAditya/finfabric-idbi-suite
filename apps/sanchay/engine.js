// Sanchay — real reconciliation matching engine over two synthetic ledgers.
// Matches bank-side vs GL-side entries on amount + date proximity + reference similarity.
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}

const LEDGERS=["Nostro (HSBC USD)","Suspense 18888","GL 21100","Inter-branch","UPI switch","Card settlement"];
const NARR=["REMIT","UPI/RRN","NEFT","IMPS","CHG","REV","FX","SETTL"];

// Levenshtein-based reference similarity (0..1)
function refSim(a,b){
  if(!a||!b) return 0;
  const m=a.length,n=b.length;const dp=Array.from({length:m+1},(_,i)=>[i,...Array(n).fill(0)]);
  for(let j=0;j<=n;j++)dp[0][j]=j;
  for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)dp[i][j]=Math.min(dp[i-1][j]+1,dp[i][j-1]+1,dp[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
  return 1-dp[m][n]/Math.max(m,n);
}
// match confidence between a bank entry and a gl entry
function matchScore(bk,gl){
  const amtMatch = bk.amount===gl.amount ? 1 : Math.max(0,1-Math.abs(bk.amount-gl.amount)/Math.max(bk.amount,1)*20);
  const dayDiff = Math.abs(bk.day-gl.day);
  const dateScore = dayDiff===0?1:dayDiff<=1?0.85:dayDiff<=2?0.6:Math.max(0,1-dayDiff*0.25);
  const ref = refSim(bk.ref,gl.ref);
  return { score: amtMatch*0.55+dateScore*0.25+ref*0.20, amtMatch, dateScore, ref, dayDiff };
}

function genLedgers(rng){
  const bank=[],gl=[];const N=340;
  for(let i=0;i<N;i++){
    const amount=Math.round((50+rng()*500000))/1;
    const day=Math.floor(rng()*6);
    const rrn=Math.floor(100000+rng()*899999);
    const ref=NARR[Math.floor(rng()*NARR.length)]+rrn;
    const bk={id:"BK-"+(5000+i),amount,day,ref,ledger:LEDGERS[Math.floor(rng()*3)]};
    bank.push(bk);
    // most have a GL counterpart with slight perturbation; some don't (exceptions)
    const r=rng();
    if(r<0.82){
      // clean or near-match
      const perturb=rng();
      gl.push({id:"GL-"+(7000+i),
        amount: perturb<0.9?amount:amount+Math.round((rng()-0.5)*200),
        day: perturb<0.8?day:day+(rng()<0.5?1:2),
        ref: perturb<0.85?ref:ref.slice(0,-1),
        ledger:bk.ledger});
    } else if(r<0.9){
      // GL entry with different amount (break)
      gl.push({id:"GL-"+(7000+i),amount:amount+Math.round(rng()*5000+500),day,ref,ledger:bk.ledger});
    }
    // else: no GL entry -> bank-side unmatched exception
  }
  // add a few GL-only orphans
  for(let i=0;i<18;i++){ gl.push({id:"GL-"+(7900+i),amount:Math.round(rng()*80000),day:Math.floor(rng()*6),ref:"ORPH"+Math.floor(rng()*9999),ledger:LEDGERS[Math.floor(rng()*3)],orphan:true}); }
  return {bank,gl};
}

// greedy reconciliation: for each bank entry find best GL match above threshold
function reconcile(bank,gl,threshold=0.9){
  const usedGL=new Set();const matched=[],suggested=[],exceptions=[];
  for(const bk of bank){
    let best=null,bestS=0,bestM=null;
    for(const g of gl){ if(usedGL.has(g.id))continue; const m=matchScore(bk,g); if(m.score>bestS){bestS=m.score;best=g;bestM=m;} }
    if(best && bestS>=threshold){ usedGL.add(best.id); matched.push({bk,gl:best,...bestM,conf:bestS}); }
    else if(best && bestS>=0.68){ usedGL.add(best.id); suggested.push({bk,gl:best,...bestM,conf:bestS,
        reason: describeBreak(bk,best,bestM), fix: suggestFix(bk,best,bestM)}); }
    else { exceptions.push({bk,type:"Unmatched bank entry",reason:`No GL counterpart within tolerance for ${bk.ref} (${bk.ledger}).`,fix:`Investigate; likely timing difference or missing GL posting. Park in suspense pending review.`,conf:0}); }
  }
  // GL orphans
  for(const g of gl){ if(!usedGL.has(g.id)){ exceptions.push({bk:null,gl:g,type:"Unmatched GL entry",reason:`GL entry ${g.ref} has no bank-side match.`,fix:`Confirm posting; if valid, await bank leg or reverse.`,conf:0}); } }
  return {matched,suggested,exceptions};
}
function describeBreak(bk,gl,m){
  const parts=[];
  if(bk.amount!==gl.amount)parts.push(`amount differs by ₹${Math.abs(bk.amount-gl.amount).toLocaleString('en-IN')}`);
  if(m.dayDiff>0)parts.push(`value-date off by ${m.dayDiff} day(s)`);
  if(m.ref<1)parts.push(`reference partially matches (${Math.round(m.ref*100)}%)`);
  return `Probable match to ${gl.id}: ${parts.join(", ")||"minor variance"}.`;
}
function suggestFix(bk,gl,m){
  if(bk.amount!==gl.amount) return `Post adjustment of ₹${Math.abs(bk.amount-gl.amount).toLocaleString('en-IN')} and reconcile to ${gl.id}. Confidence ${Math.round(m.score*100)}%.`;
  if(m.dayDiff>0) return `Match to ${gl.id} with value-date adjustment (T+${m.dayDiff}). Confidence ${Math.round(m.score*100)}%.`;
  return `Auto-resolve to ${gl.id} via reference lookup. Confidence ${Math.round(m.score*100)}%.`;
}
function build(){ const rng=mulberry32(20260714); const {bank,gl}=genLedgers(rng); const res=reconcile(bank,gl); return {bank,gl,...res}; }
window.SANCHAY={build,matchScore,reconcile};
