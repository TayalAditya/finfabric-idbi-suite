import { useState } from "react";
import { Topbar, RAG } from "../Shared";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const MATCH = [
  { name: "Auto-matched", value: 9412, color: "#046A38" },
  { name: "AI-suggested", value: 486, color: "#F58220" },
  { name: "Exceptions", value: 102, color: "#D64545" },
];
const EXC = [
  { id: "EX-3391", type: "Nostro break", amt: "₹4,20,000", age: "2d", rag: "R",
    reason: "Debit in Nostro (HSBC USD) has no matching credit in GL 21100. Value-date mismatch of 1 day detected against SWIFT MT940 line 4471.",
    fix: "Match to pending inward remittance REM-88213 (same amount, T+1). Post value-date adjustment entry. Confidence 91%." },
  { id: "EX-3402", type: "Suspense entry", amt: "₹58,300", age: "5d", rag: "A",
    reason: "Credit parked in suspense 18888 — narration 'UPI RRN 4471…' has no beneficiary mapping.",
    fix: "Auto-resolve to customer A/C 5521 via RRN lookup in UPI switch logs. Confidence 87%." },
  { id: "EX-3410", type: "GL mismatch", amt: "₹1,12,900", age: "1d", rag: "A",
    reason: "Inter-branch GL entry BR-042 → BR-118 unbalanced by ₹1,12,900 after charge posting.",
    fix: "Missing service-charge leg; draft reversal + re-post with correct tax code. Confidence 79%." },
];

export default function Sanchay() {
  const [sel, setSel] = useState(EXC[0]);
  return (
    <>
      <Topbar crumb="Open Track 05 · Back-Office Operations" title="Sanchay — Agentic Reconciliation & Exception Copilot" pill="Novel Idea" />
      <div className="wrap">
        <div className="card" style={{ marginBottom: 18, background: "#f2f8f4" }}>
          <div style={{ fontSize: 12.5 }}><b>Distinct from PS 01–04</b> (all customer/credit-facing). Sanchay targets an internal
            operations pain the bank explicitly flagged — <b>back-office reconciliation & exception handling</b>. Agentic AI
            auto-matches Nostro / suspense / GL entries, explains every break, drafts a resolution, and keeps a maker-checker human in control.</div>
        </div>

        <div className="grid g4" style={{ marginBottom: 20 }}>
          <div className="stat"><div className="lbl">Entries reconciled today</div><div className="val">10,000</div><div className="delta">across 6 ledgers</div></div>
          <div className="stat"><div className="lbl">Auto-match rate</div><div className="val">94.1%</div><div className="delta up">▲ from 61% manual</div></div>
          <div className="stat"><div className="lbl">Open exceptions</div><div className="val" style={{ color: "#D64545" }}>102</div><div className="delta up">AI-triaged & explained</div></div>
          <div className="stat"><div className="lbl">Recon effort saved</div><div className="val">68%</div><div className="delta up">ops hours / day</div></div>
        </div>

        <div className="grid" style={{ gridTemplateColumns: "300px 1fr", alignItems: "start" }}>
          <div className="card">
            <h3>Today's Reconciliation Run</h3>
            <div className="sub">EOD batch · 18:40 IST</div>
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
              <h3>Exception Queue — AI-triaged</h3>
              <div className="sub">Click an exception to see the AI explanation & suggested resolution</div>
              <table>
                <thead><tr><th>Ref</th><th>Type</th><th>Amount</th><th>Age</th><th>Severity</th></tr></thead>
                <tbody>
                  {EXC.map((e) => (
                    <tr key={e.id} onClick={() => setSel(e)} style={{ cursor: "pointer", background: sel.id === e.id ? "#f2f8f4" : "" }}>
                      <td className="tname">{e.id}</td><td>{e.type}</td><td>{e.amt}</td><td>{e.age}</td><td><RAG v={e.rag} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid g2">
              <div className="card">
                <h3>🔍 AI Explanation</h3>
                <div className="sub">{sel.id} · {sel.type} · {sel.amt}</div>
                <p style={{ fontSize: 12.5, lineHeight: 1.55, color: "#42504d" }}>{sel.reason}</p>
              </div>
              <div className="card" style={{ borderColor: "#fcd9b3", background: "#fff7ef" }}>
                <h3>✨ Suggested Resolution</h3>
                <div className="sub">Draft — requires maker-checker approval</div>
                <p style={{ fontSize: 12.5, lineHeight: 1.55, color: "#42504d" }}>{sel.fix}</p>
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <button className="btn">Approve (Checker)</button>
                  <button className="btn ghost">Edit</button>
                  <button className="btn o">Escalate</button>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="sectitle">Audit Trail</div>
              <div style={{ fontSize: 12, color: "#42504d", lineHeight: 1.9 }}>
                <div>18:40 — EOD batch ingested (10,000 entries, 6 ledgers)</div>
                <div>18:41 — Agent auto-matched 9,412 · suggested 486 · flagged 102 exceptions</div>
                <div>18:43 — Maker <b>ops.rao</b> reviewed EX-3391, accepted AI resolution</div>
                <div>18:44 — Awaiting checker approval · full lineage retained (immutable log)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
