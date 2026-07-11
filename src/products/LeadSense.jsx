import { useState } from "react";
import { Topbar, RAG, Bar } from "../Shared";
import { BarChart, Bar as RBar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, LabelList } from "recharts";

const LEADS = [
  { id: "C-88213", name: "Rahul Sharma", seg: "Salaried · IT", intent: 88, capacity: 82, product: "Home Loan", ticket: "₹42 L", rag: "G",
    why: ["Repeated home-loan page visits (4× this week)", "EMI-to-income headroom 46%", "Stable salary credits 22 months", "Disciplined saver — 31% retained"] },
  { id: "C-88217", name: "Fatima Khan", seg: "Self-employed · Retail", intent: 74, capacity: 69, product: "Business Loan", ticket: "₹18 L", rag: "A",
    why: ["UPI turnover ₹6.2L/mo, stable", "Industry margin ~14% → est. income ₹86k", "Some month-to-month cash-flow variance"] },
  { id: "C-88221", name: "Vikram Rao", seg: "Salaried · Govt", intent: 34, capacity: 91, product: "Auto Loan", ticket: "₹9 L", rag: "A",
    why: ["High capacity but low intent — no recent activity", "Only 1 dwell on auto-loan page (12s)", "Likely window-shopping"] },
  { id: "C-88230", name: "Anita Desai", seg: "Gig worker", intent: 81, capacity: 44, product: "Personal Loan", ticket: "₹3 L", rag: "R",
    why: ["Strong intent signals", "Salary spent within 3 days of credit", "Low disposable income after obligations", "Irregular gig inflows"] },
  { id: "C-88235", name: "Suresh Menon", seg: "Salaried · Pvt", intent: 90, capacity: 78, product: "Mortgage Loan", ticket: "₹65 L", rag: "G",
    why: ["Pre-approved offer viewed 3×", "Existing IDBI liability relationship", "FOIR-alternative cash-flow score strong"] },
];
const FUNNEL_OLD = [{ name: "Raw leads", v: 10000, fill: "#c9e3d6" }, { name: "Contacted", v: 3200, fill: "#8bc4a8" }, { name: "Qualified", v: 480, fill: "#0e7c70" }, { name: "Converted", v: 98, fill: "#046A38" }];

export default function LeadSense() {
  const [sel, setSel] = useState(LEADS[0]);
  return (
    <>
      <Topbar crumb="Solution Suite · PS-02 Lead Generation" title="LeadSense — Intent × Capacity Lead Intelligence" pill="Conversion-first" />
      <div className="wrap">
        <div className="grid g4" style={{ marginBottom: 20 }}>
          <div className="stat"><div className="lbl">Baseline conversion</div><div className="val" style={{ color: "#D64545" }}>1.0%</div><div className="delta down">▼ sundry leads, staff wasted</div></div>
          <div className="stat"><div className="lbl">LeadSense conversion</div><div className="val">32%</div><div className="delta up">▲ quality-first targeting</div></div>
          <div className="stat"><div className="lbl">RM effort saved</div><div className="val">71%</div><div className="delta up">fewer dead-end calls</div></div>
          <div className="stat"><div className="lbl">Leads scored / day</div><div className="val">18.4k</div><div className="delta">real-time</div></div>
        </div>

        <div className="grid" style={{ gridTemplateColumns: "1fr 380px", alignItems: "start" }}>
          <div className="card">
            <h3>Prioritised Lead Queue</h3>
            <div className="sub">Ranked by Intent × Repayment Capacity — RMs work top-down</div>
            <table>
              <thead><tr><th>Prospect</th><th>Segment</th><th>Product</th><th>Intent</th><th>Capacity</th><th>Verdict</th></tr></thead>
              <tbody>
                {LEADS.map((l) => (
                  <tr key={l.id} onClick={() => setSel(l)} style={{ cursor: "pointer", background: sel.id === l.id ? "#f2f8f4" : "" }}>
                    <td><div className="tname">{l.name}</div><div className="tsub">{l.id} · {l.ticket}</div></td>
                    <td style={{ fontSize: 12 }}>{l.seg}</td>
                    <td><span className="badge">{l.product}</span></td>
                    <td style={{ width: 90 }}><Bar pct={l.intent} color="#046A38" /><span className="tsub">{l.intent}</span></td>
                    <td style={{ width: 90 }}><Bar pct={l.capacity} color="#F58220" /><span className="tsub">{l.capacity}</span></td>
                    <td><RAG v={l.rag} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid" style={{ gap: 18 }}>
            <div className="card">
              <h3>{sel.name} — why this score</h3>
              <div className="sub">{sel.product} · Intent {sel.intent} · Capacity {sel.capacity}</div>
              {sel.why.map((w, i) => (
                <div className="reason" key={i}><span className="dot" style={{ background: i < 2 ? "#2F9E64" : "#F58220" }} />{w}</div>
              ))}
              <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                <button className="btn">Assign to RM</button>
                <button className="btn ghost">Nurture campaign</button>
              </div>
            </div>
            <div className="card">
              <h3>Legacy funnel — the leakage</h3>
              <div className="sub">10,000 raw leads → 98 conversions (~1%)</div>
              <ResponsiveContainer width="100%" height={170}>
                <BarChart data={FUNNEL_OLD} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" hide /><YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={70} />
                  <Tooltip />
                  <RBar dataKey="v" radius={[0, 6, 6, 0]}>
                    {FUNNEL_OLD.map((e, i) => <Cell key={i} fill={e.fill} />)}
                    <LabelList dataKey="v" position="right" style={{ fontSize: 11, fill: "#42504d" }} />
                  </RBar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
