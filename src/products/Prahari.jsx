import { useState } from "react";
import { Topbar, RAG } from "../Shared";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine, BarChart, Bar as RBar, Cell } from "recharts";

const PD_TREND = [
  { m: "M-12", pd: 4 }, { m: "M-10", pd: 6 }, { m: "M-8", pd: 9 },
  { m: "M-6", pd: 14 }, { m: "M-4", pd: 22 }, { m: "M-2", pd: 31 }, { m: "Now", pd: 38 },
];
const DRIVERS = [
  { f: "Declining GST turnover (3 qtrs)", w: 0.28 },
  { f: "Rising overdraft utilisation", w: 0.22 },
  { f: "Delayed EMI (2× in 6 mo)", w: 0.18 },
  { f: "Power consumption ↓ 40%", w: 0.14 },
  { f: "Bureau enquiry spike", w: 0.10 },
  { f: "Sector stress (cold chain)", w: 0.08 },
];
const PORTFOLIO = [
  { id: "LN-2231", name: "Kisan Cold Storage", exp: "₹1.9 Cr", pd: 38, rag: "R", band: "12-mo default likely" },
  { id: "LN-2245", name: "Anand Auto Spares", exp: "₹62 L", pd: 19, rag: "A", band: "Watch — early stress" },
  { id: "LN-2250", name: "Shreeja Textiles", exp: "₹1.1 Cr", pd: 6, rag: "G", band: "Healthy" },
  { id: "LN-2261", name: "Nova Pharma Dist.", exp: "₹84 L", pd: 24, rag: "A", band: "Watch — margin dip" },
  { id: "LN-2270", name: "Meera Handicrafts", exp: "₹38 L", pd: 4, rag: "G", band: "Healthy" },
];
const METRICS = [
  ["AUC-ROC", "0.89"], ["Recall (default class)", "0.84"], ["Precision", "0.71"],
  ["F1-score", "0.77"], ["KS statistic", "0.58"], ["Lead time", "12 months"],
];

export default function Prahari() {
  const [sel, setSel] = useState(PORTFOLIO[0]);
  return (
    <>
      <Topbar crumb="Solution Suite · PS-04 Default Prediction" title="Prahari — 12-Month Early-Warning System" pill="Predict before stress" />
      <div className="wrap">
        <div className="grid g4" style={{ marginBottom: 20 }}>
          <div className="stat"><div className="lbl">Portfolio monitored</div><div className="val">₹4.8k Cr</div><div className="delta">MSME loan book</div></div>
          <div className="stat"><div className="lbl">Accounts at Red</div><div className="val" style={{ color: "#D64545" }}>142</div><div className="delta down">▲ flagged 12-mo early</div></div>
          <div className="stat"><div className="lbl">Model AUC-ROC</div><div className="val">0.89</div><div className="delta up">not raw accuracy</div></div>
          <div className="stat"><div className="lbl">Lead time gain</div><div className="val">+9 mo</div><div className="delta up">vs current 3-mo model</div></div>
        </div>

        <div className="card" style={{ marginBottom: 18, background: "#fff7ef", borderColor: "#fcd9b3" }}>
          <div style={{ fontSize: 12.5 }}><b>Why we don't report raw accuracy:</b> default data is highly imbalanced.
            Prahari is tuned and reported on <b>AUC-ROC, Recall, Precision, F1 and KS</b> — the metrics that actually
            measure early-warning quality for a lender. Output is delivered as RAG risk buckets, in the loan officer's language.</div>
        </div>

        <div className="grid" style={{ gridTemplateColumns: "1fr 400px", alignItems: "start" }}>
          <div className="card">
            <h3>Portfolio Watchlist</h3>
            <div className="sub">Ranked by 12-month probability of default</div>
            <table>
              <thead><tr><th>Account</th><th>Exposure</th><th>12-mo PD</th><th>Status</th></tr></thead>
              <tbody>
                {PORTFOLIO.map((p) => (
                  <tr key={p.id} onClick={() => setSel(p)} style={{ cursor: "pointer", background: sel.id === p.id ? "#f2f8f4" : "" }}>
                    <td><div className="tname">{p.name}</div><div className="tsub">{p.id}</div></td>
                    <td>{p.exp}</td>
                    <td><b style={{ color: p.rag === "R" ? "#D64545" : p.rag === "A" ? "#E8A33D" : "#2F9E64" }}>{p.pd}%</b></td>
                    <td><RAG v={p.rag} /><div className="tsub">{p.band}</div></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: 16 }}>
              <div className="sectitle">Model Performance (synthetic-data prototype)</div>
              <div className="grid g3">
                {METRICS.map(([k, v]) => (
                  <div key={k} style={{ border: "1px solid #e4ebe8", borderRadius: 10, padding: "10px 12px" }}>
                    <div className="tsub">{k}</div><div style={{ fontSize: 18, fontWeight: 800, color: "#046A38" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid" style={{ gap: 18 }}>
            <div className="card">
              <h3>{sel.name} — PD trajectory</h3>
              <div className="sub">Probability of default rising toward 12-month horizon</div>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={PD_TREND}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eef2f0" />
                  <XAxis dataKey="m" tick={{ fontSize: 10 }} /><YAxis tick={{ fontSize: 10 }} unit="%" />
                  <Tooltip /><ReferenceLine y={25} stroke="#D64545" strokeDasharray="4 4" label={{ value: "Alert", fontSize: 10, fill: "#D64545" }} />
                  <Line type="monotone" dataKey="pd" stroke="#D64545" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="card">
              <h3>Top risk drivers</h3>
              <div className="sub">Explainable contribution (SHAP)</div>
              <ResponsiveContainer width="100%" height={185}>
                <BarChart data={DRIVERS} layout="vertical" margin={{ left: 10 }}>
                  <XAxis type="number" hide /><YAxis type="category" dataKey="f" tick={{ fontSize: 9.5 }} width={165} />
                  <Tooltip /><RBar dataKey="w" radius={[0, 5, 5, 0]} fill="#F58220" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="card" style={{ background: "#f2f8f4" }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Recommended action</div>
              <div className="tsub">Early engagement: restructure review, enhanced monitoring, and relationship-manager outreach — 12 months before likely default, while corrective measures are still viable.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
