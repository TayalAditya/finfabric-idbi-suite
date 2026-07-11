// UdyamScore — real MSME Financial Health scoring engine (deterministic, explainable).
// No hardcoded scores: every score is computed live from the entity's features.

// ---- Seeded PRNG so the synthetic dataset is stable across reloads ----
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}

const SECTORS = ["Textiles","Auto Trading","Cold Chain","Handicrafts","Pharma Distribution","FMCG Retail","Logistics","Food Processing","Electronics","Agri Inputs"];
const CONSTS = ["Proprietorship","Partnership","Pvt Ltd","LLP"];
const NAMES_A = ["Shreeja","Anand","Kisan","Meera","Nova","Sunrise","Ganesh","Lakshmi","Vertex","Prime","Royal","Bharat","Kaveri","Sagar","Deccan","Orbit","Zenith","Vishnu","Anmol","Surya"];
const NAMES_B = ["Textiles","Auto Spares","Cold Storage","Handicrafts","Pharma","Traders","Logistics","Foods","Electronics","Agro","Enterprises","Industries","Exports","Retail","Distributors"];

// ---- Six-dimension weighted model. Weights sum to 1. ----
const WEIGHTS = { cashflow:0.24, compliance:0.18, stability:0.16, growth:0.14, discipline:0.16, bureau:0.12 };
const DIM_LABEL = { cashflow:"Cash-flow Strength", compliance:"Compliance", stability:"Business Stability", growth:"Growth Momentum", discipline:"Banking Discipline", bureau:"Bureau Signals" };

// Compute each dimension (0..100) from raw features, then composite 300..900.
function scoreEntity(f){
  // f: raw features object
  const dims = {};
  // Cash-flow: inflow stability + surplus ratio
  dims.cashflow = clamp(100 - f.inflowVolatility*0.6 + f.surplusRatio*0.5 - (f.bounceRate*2));
  // Compliance: GST punctuality + filing completeness
  dims.compliance = clamp(f.gstOnTimeRate*0.7 + f.gstFilingCompleteness*0.3);
  // Stability: vintage + sector risk + employee base (EPFO)
  dims.stability = clamp(Math.min(f.vintageYears,8)/8*55 + (100-f.sectorRisk)*0.30 + Math.min(f.employees,25)/25*15);
  // Growth: turnover YoY + utility-load growth (proxy for output)
  dims.growth = clamp(50 + f.turnoverYoY*1.6 + f.utilityGrowth*0.8);
  // Discipline: overdraft usage (inverse) + salary/EMI regularity
  dims.discipline = clamp(100 - f.overdraftUsage*0.7 + f.repaymentRegularity*0.4 - 20);
  // Bureau: thin-file penalized softly, delinquency hard
  dims.bureau = clamp(f.thinFile ? 55 - f.delinquencies*18 : 78 - f.delinquencies*22 + f.creditVintage*1.2);

  let composite01 = 0;
  for(const k in WEIGHTS) composite01 += (dims[k]/100)*WEIGHTS[k];
  const score = Math.round(300 + composite01*600); // 300..900
  const rag = score>=680 ? "G" : score>=560 ? "A" : "R";

  // reason codes: rank dimension contributions vs a 65 baseline
  const contributions = Object.keys(dims).map(k=>({
    key:k, label:DIM_LABEL[k], val:Math.round(dims[k]),
    impact: Math.round((dims[k]-65)*WEIGHTS[k]*6)   // signed points
  }));
  const pos = contributions.filter(c=>c.impact>0).sort((a,b)=>b.impact-a.impact);
  const neg = contributions.filter(c=>c.impact<0).sort((a,b)=>a.impact-b.impact);
  return { dims, score, rag, contributions, pos, neg, composite01 };
}
function clamp(x){return Math.max(2,Math.min(100,x));}

// ---- Generate a realistic synthetic MSME with raw features ----
function genEntity(rng, i){
  const sector = SECTORS[Math.floor(rng()*SECTORS.length)];
  const sectorRiskMap = {"Cold Chain":62,"Logistics":50,"Textiles":40,"Pharma Distribution":30,"FMCG Retail":34,"Food Processing":44,"Electronics":38,"Agri Inputs":48,"Handicrafts":42,"Auto Trading":45};
  const thinFile = rng()<0.32;
  const vintageYears = +(0.5 + rng()*9).toFixed(1);
  const f = {
    inflowVolatility: Math.round(rng()*70),          // 0 good .. 70 bad
    surplusRatio: Math.round(rng()*60),              // retained % of inflow
    bounceRate: Math.round(rng()*12),
    gstOnTimeRate: Math.round(50+rng()*50),
    gstFilingCompleteness: Math.round(60+rng()*40),
    vintageYears,
    sectorRisk: sectorRiskMap[sector]||45,
    employees: Math.round(rng()*40),
    turnoverYoY: Math.round(-15+rng()*45),           // -15%..+30%
    utilityGrowth: Math.round(-20+rng()*50),
    overdraftUsage: Math.round(rng()*90),
    repaymentRegularity: Math.round(40+rng()*60),
    thinFile,
    delinquencies: rng()<0.8?0:Math.floor(rng()*3),
    creditVintage: thinFile?0:Math.round(rng()*8),
  };
  const turnoverCr = +(0.15 + rng()*3).toFixed(2);
  const name = NAMES_A[Math.floor(rng()*NAMES_A.length)]+" "+NAMES_B[Math.floor(rng()*NAMES_B.length)];
  const scored = scoreEntity(f);
  return {
    id:"MSME-"+(4400+i), name, sector,
    constitution: CONSTS[Math.floor(rng()*CONSTS.length)],
    ntc: thinFile, turnover: turnoverCr>=1 ? "₹"+turnoverCr+" Cr" : "₹"+Math.round(turnoverCr*100)+" L",
    vintage: f.vintageYears+" yrs", employees:f.employees,
    features:f, ...scored,
  };
}

function buildDataset(n=520){
  const rng = mulberry32(20260711);
  const arr=[]; for(let i=0;i<n;i++) arr.push(genEntity(rng,i));
  return arr;
}

window.UDYAM = { buildDataset, scoreEntity, WEIGHTS, DIM_LABEL, clamp };
