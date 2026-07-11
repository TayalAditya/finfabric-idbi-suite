// Sahayak — real wealth-advisory engine.
// LIVE data: Indian mutual fund NAVs from mfapi.in (free, no key, real market data).
// Real math: SIP future value, goal funding, suitability by age+risk.

// A curated set of real fund scheme codes on mfapi.in (large, well-known funds).
const FUNDS = [
  { code:120503, label:"Aditya Birla SL Frontline Equity", cls:"Equity" },
  { code:118825, label:"HDFC Mid-Cap Opportunities", cls:"Equity" },
  { code:122639, label:"Parag Parikh Flexi Cap", cls:"Equity" },
  { code:120716, label:"SBI Bluechip Fund", cls:"Equity" },
  { code:118989, label:"ICICI Pru Short Term Debt", cls:"Debt" },
  { code:119807, label:"HDFC Corporate Bond", cls:"Debt" },
  { code:120484, label:"SBI Gold Fund", cls:"Gold" },
];

async function fetchNAV(code){
  try{
    const r = await fetch(`https://api.mfapi.in/mf/${code}/latest`);
    if(!r.ok) throw 0;
    const j = await r.json();
    const d = j.data && j.data[0];
    return { code, name:j.meta?.scheme_name, nav:+d.nav, date:d.date };
  }catch(e){ return { code, nav:null, error:true }; }
}
async function fetchAllNAV(){
  const out = await Promise.all(FUNDS.map(async f=>{
    const n = await fetchNAV(f.code);
    return { ...f, nav:n.nav, date:n.date, ok:!n.error && n.nav };
  }));
  return out;
}
// history for a sparkline (last ~30 points)
async function fetchHistory(code){
  try{
    const r=await fetch(`https://api.mfapi.in/mf/${code}`); const j=await r.json();
    return (j.data||[]).slice(0,60).reverse().map(d=>({date:d.date,nav:+d.nav}));
  }catch(e){ return []; }
}

// ---- Real SIP future value: FV = P * [((1+i)^n - 1)/i] * (1+i) ----
function sipFV(monthly, years, annualRatePct){
  const i = annualRatePct/100/12, n = years*12;
  if(i===0) return monthly*n;
  return monthly * ((Math.pow(1+i,n)-1)/i) * (1+i);
}
// monthly SIP needed to reach a target
function sipRequired(target, years, annualRatePct){
  const i=annualRatePct/100/12, n=years*12;
  if(i===0) return target/n;
  return target / (((Math.pow(1+i,n)-1)/i)*(1+i));
}
// lumpsum FV
function lumpFV(p,years,r){ return p*Math.pow(1+r/100,years); }

// ---- Suitability engine: allocation by age + risk appetite ----
function suitability(age, risk){ // risk: 'cons'|'mod'|'aggr'
  // base equity via rule-of-thumb then adjust for risk
  let equity = Math.max(20, Math.min(80, 100 - age));
  if(risk==="cons") equity -= 18;
  if(risk==="aggr") equity += 15;
  equity = Math.max(15, Math.min(85, equity));
  const debt = Math.round((100-equity)*0.62);
  const gold = Math.round((100-equity)*0.22);
  const liquid = 100-equity-debt-gold;
  const expReturn = (equity*0.115 + debt*0.07 + gold*0.08 + liquid*0.05)/100*100; // blended %
  return { equity:Math.round(equity), debt, gold, liquid, expReturn:+expReturn.toFixed(1) };
}
function riskLabel(age,risk){
  const base = risk==="aggr"?"Aggressive":risk==="cons"?"Conservative":"Moderate";
  return base + (age>=55?" (capital-preservation tilt)":age<=30?" (long-horizon)":"");
}

window.SAHAYAK = { FUNDS, fetchAllNAV, fetchHistory, sipFV, sipRequired, lumpFV, suitability, riskLabel };
