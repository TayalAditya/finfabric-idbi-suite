import { useState } from "react";
import { ProductHeader, RAG } from "../Shared";
import { PRODUCTS } from "../brand";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const P = PRODUCTS.sanchay;
const MATCH = [
  { name: "Auto-matched", value: 9412, color: P.accent },
  { name: "AI-suggested", value: 486, color: "#F58220" },
  { name: "Exceptions", value: 102, color: "#D64545" },
];
const EXC = [
  { id: "EX-3391", type: "Nostro break", amt: "₹4,20,000", age: "2d", rag: "R",
    reason: "Debit in Nostro (HSBC USD) has no matching credit in GL 21100. Value-date mismatch of 1 day detected against SWIFT MT940 line 4471.",
    fix: "Match to pending inward remittance REM-88213 (same amount, T+1). Post value-date adjustment entry. Confidence 91%." },
  { id: "EX-3402", type: "Suspense entry", amt: "₹58,300", age: "5d", rag: "A",
    reason: "Credit parked in suspense 18888, narration 'UPI RRN 4471' has no beneficiary mapping.",
    fix: "Auto-resolve to customer A/C 5521 via RRN lookup in UPI switch logs. Confidence 87%." },
  { id: "EX-3410", type: "GL mismatch", amt: "₹1,12,900", age: "1d", rag: "A",
    reason: "Inter-branch GL entry BR-042 to BR-118 unbalanced by ₹1,12,900 after charge posting.",
    fix: "Missing service-charge leg; draft reversal and re-post with correct tax code. Confidence 79%." },
];

const SearchI = () => (<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke={P.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>);
const SparkI = () => (<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="#F58220" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/></svg>);

export default function Sanchay() {
  const [sel, setSel] = useState(EXC[0]);
  return (
    <div style={{ "--pa": P.accent }}>
      <ProductHeader pkey="sanchay" right={<span className="phead-pill">Open Track · Novel Idea</span>} />
      <div className="wrap">
        <div className="card" style={{ marginBottom: 18, background: P.soft }}>
          <div style={{ fontSize: 12.5 }}><b>Distinct from PS 01 to 04</b> (all customer or credit-facing). Sanchay targets an internal
            operations pain the bank explicitly flagged: <b>back-office reconciliation and exception handling</b>. Agentic AI
            auto-matches Nostro, suspense and GL entries, explains every break, drafts a resolution, and keeps a maker-checker human in control.</div>
        </div>

        <div className="grid g4" style={{ marginBottom: 20 }}>
          <div className="stat" style={{ borderTop: `3px solid ${P.accent}` }}><div className="lbl">Entries reconciled today</div><div className="val" style={{ color: P.accent }}>10,000</div><div className="delta">across 6 ledgers</div></div>
          <div className="stat" style={{ borderTop: `3px solid ${P.accent}` }}><div className="lbl">Auto-match rate</div><div className="val" style={{ color: P.accent }}>94.1%</div><div className="delta up">from 61% manual</div></div>
          <div className="stat" style={{ borderTop: "3px solid #D64545" }}><div className="lbl">Open exceptions</div><div className="val" style={{ color: "#D64545" }}>102</div><div className="delta up">AI-triaged and explained</div></div>
          <div className="stat" style={{ borderTop: `3px solid ${P.accent}` }}><div className="lbl">Recon effort saved</div><div className="val" style={{ color: P.accent }}>68%</div><div className="delta up">ops hours / day</div></div>
        </div>

        <div className="grid" style={{ gridTemplateColumns: "300px 1fr", alignItems: "start" }}>
          <div className="card">
            <h3>Today's Reconciliation Run</h3>
            <div className="sub">EOD batch, 18:40 IST</div>
            <ResponsiveContainer width="100%" height={190}>
              <PieChart>
                <Pie data={MATCH} dataKey="value" nameKey="name" innerRadius={45} outerRadius={72} paddingAngle={2}>
                  {MATCH.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie><Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {MATCH.map((m) => (
              <div key={m.name} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "5px 0" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <i style={{ width: 9, height: 9, borderRadius: 2, background: m.color, display: "inline-block" }} />{m.name}
                </span><b>{m.value.toLocaleString()}</b>
              </div>
            ))}
          </div>

          <div className="grid" style={{ gap: 18 }}>
            <div className="card">
              <h3>Exception Queue, AI-triaged</h3>
              <div className="sub">Click an exception to see the AI explanation and suggested resolution</div>
              <table>
                <thead><tr><th>Ref</th><th>Type</th><th>Amount</th><th>Age</th><th>Severity</th></tr></thead>
                <tbody>
                  {EXC.map((e) => (
                    <tr key={e.id} onClick={() => setSel(e)} style={{ cursor: "pointer", background: sel.id === e.id ? P.soft : "" }}>
                      <td className="tname">{e.id}</td><td>{e.type}</td><td>{e.amt}</td><td>{e.age}</td><td><RAG v={e.rag} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid g2">
              <div className="card">
                <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}><SearchI /> AI Explanation</h3>
                <div className="sub">{sel.id} · {sel.type} · {sel.amt}</div>
                <p style={{ fontSize: 12.5, lineHeight: 1.55, color: "#42504d" }}>{sel.reason}</p>
              </div>
              <div className="card" style={{ borderColor: "#fcd9b3", background: "#fff7ef" }}>
                <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}><SparkI /> Suggested Resolution</h3>
                <div className="sub">Draft, requires maker-checker approval</div>
                <p style={{ fontSize: 12.5, lineHeight: 1.55, color: "#42504d" }}>{sel.fix}</p>
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <button className="btn" style={{ background: P.accent }}>Approve (Checker)</button>
                  <button className="btn ghost" style={{ background: P.soft, color: P.accent }}>Edit</button>
                  <button className="btn" style={{ background: "#F58220" }}>Escalate</button>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="sectitle acc">Audit Trail</div>
              <div style={{ fontSize: 12, color: "#42504d", lineHeight: 1.9 }}>
                <div>18:40, EOD batch ingested (10,000 entries, 6 ledgers)</div>
                <div>18:41, Agent auto-matched 9,412, suggested 486, flagged 102 exceptions</div>
                <div>18:43, Maker <b>ops.rao</b> reviewed EX-3391, accepted AI resolution</div>
                <div>18:44, Awaiting checker approval, full lineage retained (immutable log)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
