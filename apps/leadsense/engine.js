// LeadSense — real Intent x Capacity lead scoring on synthetic transaction behaviour.
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}

const FIRST=["Rahul","Fatima","Vikram","Anita","Suresh","Priya","Arjun","Neha","Karan","Divya","Manish","Sneha","Rohit","Pooja","Amit","Kavya","Sanjay","Ritu","Deepak","Meera"];
const LAST=["Sharma","Khan","Rao","Desai","Menon","Iyer","Gupta","Reddy","Nair","Joshi","Patel","Bose","Verma","Shah","Kumar"];
const SEGS=[["Salaried · IT",1],["Salaried · Govt",1],["Salaried · Pvt",1],["Self-employed · Retail",2],["Self-employed · Services",2],["Gig worker",3]];
const PRODUCTS=["Home Loan","Personal Loan","Auto Loan","Mortgage Loan","Business Loan"];

// INTENT: behavioural signals -> 0..100
function intentScore(b){
  return clamp( b.pageVisits*7 + b.dwellSec*0.12 + b.revisits*9 + b.campaignClick*14 + b.preApprovedView*10 - (b.bounced?18:0) );
}
// CAPACITY: cash-flow underwriting -> 0..100 (not just FOIR)
function capacityScore(c){
  // disposable income ratio, salary stability, obligations, spend discipline
  const disposable = c.income>0 ? (c.income - c.obligations - c.essentialSpend)/c.income : 0;
  let s = disposable*90 + c.salaryStabilityMonths*1.2 - c.spentDay1Ratio*30 - (c.gig? 12:0);
  s += c.retainedRatio*0.5;
  return clamp(s);
}
function clamp(x){return Math.max(2,Math.min(100,Math.round(x)));}

function estIncome(c){ // reconstruct monthly income view
  if(c.gig){ return Math.round(c.turnover*c.margin/100); }
  return c.income;
}

function genLead(rng,i){
  const [seg,segType]=SEGS[Math.floor(rng()*SEGS.length)];
  const gig=segType===3, selfEmp=segType===2;
  const income = selfEmp||gig ? Math.round(30000+rng()*180000) : Math.round(35000+rng()*140000);
  const b={ pageVisits:Math.floor(rng()*6), dwellSec:Math.floor(rng()*180), revisits:Math.floor(rng()*4),
    campaignClick:rng()<0.4?1:0, preApprovedView:rng()<0.3?1:0, bounced:rng()<0.3 };
  const c={ income, gig, obligations:Math.round(income*rng()*0.4), essentialSpend:Math.round(income*(0.25+rng()*0.35)),
    salaryStabilityMonths:Math.floor(rng()*36), spentDay1Ratio:rng(), retainedRatio:Math.round(rng()*40),
    turnover:Math.round(200000+rng()*1500000), margin:Math.round(8+rng()*22) };
  const intent=intentScore(b), capacity=capacityScore(c);
  const combined = Math.round(intent*0.5+capacity*0.5);
  const rag = (intent>=70&&capacity>=70)?"G" : (intent>=50&&capacity>=50)?"A" : "R";
  const ticket = Math.round((5+rng()*70))*100000;
  return {
    id:"C-"+(88200+i), name:FIRST[Math.floor(rng()*FIRST.length)]+" "+LAST[Math.floor(rng()*LAST.length)],
    seg, gig, selfEmp, product:PRODUCTS[Math.floor(rng()*PRODUCTS.length)],
    ticket: ticket>=10000000?"₹"+(ticket/10000000).toFixed(1)+" Cr":"₹"+(ticket/100000).toFixed(0)+" L",
    intent, capacity, combined, rag, estIncome:estIncome(c), behaviour:b, cashflow:c,
    why: buildWhy(b,c,intent,capacity)
  };
}
function buildWhy(b,c,intent,capacity){
  const w=[];
  if(b.revisits>=2)w.push(["+",`Revisited product page ${b.revisits}x`]);
  if(b.preApprovedView)w.push(["+","Viewed pre-approved offer"]);
  if(b.campaignClick)w.push(["+","Clicked campaign"]);
  if(b.dwellSec<20)w.push(["-",`Low dwell time (${b.dwellSec}s), likely browsing`]);
  const disp=((c.income-c.obligations-c.essentialSpend)/c.income*100).toFixed(0);
  w.push([disp>25?"+":"-",`Disposable income ${disp}% of inflow`]);
  if(c.salaryStabilityMonths>=18)w.push(["+",`Stable inflow ${c.salaryStabilityMonths} months`]);
  if(c.spentDay1Ratio>0.6)w.push(["-","Spends most of inflow within days"]);
  if(c.gig)w.push(["-","Gig cash-flow, estimated via turnover x margin"]);
  return w.slice(0,5);
}
function buildDataset(n=520){const rng=mulberry32(20260712);const a=[];for(let i=0;i<n;i++)a.push(genLead(rng,i));return a;}
window.LEAD={buildDataset,intentScore,capacityScore};
