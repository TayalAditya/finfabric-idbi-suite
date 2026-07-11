// Prahari — real logistic-regression-style 12-month PD model on synthetic loan features.
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const sig=x=>1/(1+Math.exp(-x));

const NAMES_A=["Kisan","Anand","Shreeja","Nova","Meera","Ganesh","Vertex","Sunrise","Deccan","Kaveri","Orbit","Prime","Bharat","Royal","Sagar"];
const NAMES_B=["Cold Storage","Auto Spares","Textiles","Pharma Dist.","Handicrafts","Traders","Logistics","Foods","Agro","Exports","Industries","Retail"];
const SECTORS=["Cold Chain","Auto Trading","Textiles","Pharma","Handicrafts","Logistics","Food Processing","Agri"];

// Logistic model. Coefficients (interpretable). Features standardized-ish to 0..1 first.
// Higher feature = more risk unless noted.
const COEF = {
  bias:-3.6,
  turnoverDecline:2.1,   // GST turnover falling
  overdraftUtil:1.5,     // overdraft utilisation
  emiDelays:1.9,         // delayed EMIs count
  utilityDrop:1.1,       // power consumption drop (proxy for slowdown)
  bureauEnquiry:0.8,     // enquiry spike
  sectorStress:0.7,      // sector risk
  vintageInv:0.6,        // low vintage = risk
};
const DRIVER_LABEL={turnoverDecline:"Declining GST turnover",overdraftUtil:"Rising overdraft utilisation",emiDelays:"Delayed EMI payments",utilityDrop:"Power consumption drop",bureauEnquiry:"Bureau enquiry spike",sectorStress:"Sector stress",vintageInv:"Short operating vintage"};

function pd(f){
  let z=COEF.bias;
  const contrib={};
  for(const k in COEF){ if(k==="bias")continue; const c=COEF[k]*f[k]; z+=c; contrib[k]=c; }
  const p=sig(z);
  // rank driver contributions (only positive risk pushers)
  const drivers=Object.keys(contrib).map(k=>({key:k,label:DRIVER_LABEL[k],c:contrib[k],val:f[k]}))
    .filter(d=>d.c>0.05).sort((a,b)=>b.c-a.c);
  const total=drivers.reduce((s,d)=>s+d.c,0)||1;
  drivers.forEach(d=>d.weight=d.c/total);
  return {pd:p, pct:Math.round(p*100), drivers, rag: p>=0.35?"R":p>=0.18?"A":"G"};
}

function genLoan(rng,i){
  const sector=SECTORS[Math.floor(rng()*SECTORS.length)];
  const stressed=rng()<0.20;
  const f={
    turnoverDecline: stressed? 0.4+rng()*0.5 : rng()*0.35,
    overdraftUtil: stressed? 0.35+rng()*0.5 : rng()*0.45,
    emiDelays: stressed? 0.35+rng()*0.5 : rng()*0.25,
    utilityDrop: stressed? 0.3+rng()*0.5 : rng()*0.35,
    bureauEnquiry: rng()*0.6,
    sectorStress: sector==="Cold Chain"?0.6:sector==="Logistics"?0.45:rng()*0.35,
    vintageInv: rng()*0.55,
  };
  const r=pd(f);
  const exp=Math.round((20+rng()*280))*1000000; // exposure
  // 12-month trajectory (rising if risky)
  const traj=[];let base=Math.max(0.02,r.pd-0.32);
  for(let m=12;m>=0;m-=2){ traj.push({m:"M-"+m, pd:Math.round(Math.max(2,Math.min(r.pct, (r.pct-(m*(r.pct/16))*(1-r.pd)) ))*10)/10 }); }
  // simpler rising curve:
  const t2=[];for(let k=0;k<7;k++){const frac=k/6;t2.push({m:k===6?"Now":"M-"+(12-k*2),pd:Math.round((base+(r.pd-base)*Math.pow(frac,1.5))*100)});}
  return {
    id:"LN-"+(2200+i), name:NAMES_A[Math.floor(rng()*NAMES_A.length)]+" "+NAMES_B[Math.floor(rng()*NAMES_B.length)],
    sector, exposure: exp>=10000000?"₹"+(exp/10000000).toFixed(1)+" Cr":"₹"+(exp/100000).toFixed(0)+" L",
    expNum:exp, features:f, ...r, traj:t2,
    band: r.rag==="R"?"12-mo default likely":r.rag==="A"?"Watch, early stress":"Healthy",
  };
}
function buildDataset(n=520){const rng=mulberry32(20260713);const a=[];for(let i=0;i<n;i++)a.push(genLoan(rng,i));return a;}

// Portfolio-level metrics computed from the scored book
function portfolioMetrics(data){
  const red=data.filter(l=>l.rag==="R").length, amber=data.filter(l=>l.rag==="A").length;
  const expAtRisk=data.filter(l=>l.rag!=="G").reduce((s,l)=>s+l.expNum,0);
  const totalExp=data.reduce((s,l)=>s+l.expNum,0);
  return {red,amber,green:data.length-red-amber,expAtRisk,totalExp,pctAtRisk:Math.round(expAtRisk/totalExp*100)};
}
window.PRAHARI={buildDataset,pd,portfolioMetrics,DRIVER_LABEL};
