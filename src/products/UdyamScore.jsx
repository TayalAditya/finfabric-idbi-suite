import { useState } from "react";
import { ProductHeader, RAG } from "../Shared";
import { PRODUCTS } from "../brand";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
} from "recharts";

const P = PRODUCTS.udyamscore;

const APPLICANTS = [
  { id: "MSME-4471", name: "Shreeja Textiles", type: "Proprietorship · Manufacturing", sector: "Textiles", ntc: true,
    score: 742, rag: "G", turnover: "₹1.4 Cr", vintage: "3.2 yrs",
    dims: { Cashflow: 78, Compliance: 85, Stability: 70, Growth: 74, Discipline: 82, Bureau: 68 },
    pos: ["Consistent GST filings, 24 of 24 on time", "Stable UPI inflow velocity, low volatility", "Electricity load matches declared production"],
    neg: ["Thin bureau history (new to credit)", "Seasonal dip in Q1 cash-flows"] },
  { id: "MSME-4472", name: "Anand Auto Spares", type: "Partnership · Trading", sector: "Auto Trading", ntc: false,
    score: 631, rag: "A", turnover: "₹86 L", vintage: "5.1 yrs",
    dims: { Cashflow: 62, Compliance: 58, Stability: 74, Growth: 55, Discipline: 60, Bureau: 66 },
    pos: ["Long operating vintage (5+ yrs)", "Diversified supplier base"],
    neg: ["2 GST filings delayed in last year", "Declining margin trend last 2 quarters", "High current-account overdraft usage"] },
  { id: "MSME-4473", name: "Kisan Cold Storage", type: "Pvt Ltd · Logistics", sector: "Cold Chain", ntc: false,
    score: 388, rag: "R", turnover: "₹2.1 Cr", vintage: "1.8 yrs",
    dims: { Cashflow: 35, Compliance: 42, Stability: 40, Growth: 30, Discipline: 33, Bureau: 45 },
    pos: ["Asset-backed (owned cold storage)"],
    neg: ["Erratic UPI inflows, high bounce rate", "EPFO contributions lapsed 3 months", "Power consumption dropped 40%, possible slowdown", "Recent bureau delinquency flag"] },
  { id: "MSME-4474", name: "Meera Handicrafts", type: "Proprietorship · Retail", sector: "Handicrafts", ntc: true,
    score: 705, rag: "G", turnover: "₹52 L", vintage: "2.4 yrs",
    dims: { Cashflow: 72, Compliance: 80, Stability: 66, Growth: 78, Discipline: 76, Bureau: 60 },
    pos: ["Strong festive-season growth momentum", "Clean UPI repayment behaviour", "Export receipts add inflow stability"],
    neg: ["Limited formal credit footprint"] },
];

const SRC_ICON = (color) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" /></svg>
);
const WARN_ICON = (color) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /><path d="M12 9v4M12 17h.01" /></svg>
);

const SOURCES = [
  { k: "GST Network", s: "24 returns · 96% on-time", ok: true },
  { k: "Account Aggregator", s: "18 mo bank flows · consented", ok: true },
  { k: "UPI Patterns", s: "3,410 txns analysed", ok: true },
  { k: "EPFO", s: "12 employees · active", ok: true },
  { k: "Electricity / Utility", s: "Load profile linked", ok: true },
  { k: "Credit Bureau", s: "Thin file · flagged", ok: false },
];

function KIcon({ path }) {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{path}</svg>;
}

export default function UdyamScore() {
  const [sel, setSel] = useState(APPLICANTS[0]);
  const radarData = Object.entries(sel.dims).map(([k, v]) => ({ dim: k, v }));
  const scorePct = Math.round(((sel.score - 300) / 600) * 100);
  const ragColor = sel.rag === "G" ? "#2F9E64" : sel.rag === "A" ? "#E8A33D" : "#D64545";

  return (
    <div style={{ "--pa": P.accent }}>
      <ProductHeader pkey="udyamscore" right={<span className="phead-pill">Near real-time scoring</span>} />
      <div className="wrap">
        <div className="grid g4" style={{ marginBottom: 20 }}>
          {[
            ["MSMEs assessed (mo.)", "5,240", "34% NTC onboarded", <path d="M3 3v18h18" key="a"/>],
            ["Median assessment time", "43s", "vs 3 to 5 days manual", <><circle cx="12" cy="12" r="9" key="b"/><path d="M12 7v5l3 2" key="c"/></>],
            ["Model AUC-ROC", "0.86", "KS 0.52", <path d="M3 12h4l3-8 4 16 3-8h4" key="d"/>],
            ["Approval lift (thin-file)", "+34%", "at equal expected loss", <path d="M7 17 17 7M17 7h-6M17 7v6" key="e"/>],
          ].map(([lbl, val, dl, ic], i) => (
            <div className="stat" key={i} style={{ borderTop: `3px solid ${P.accent}` }}>
              <div className="kpi-ic" style={{ background: P.accent }}><KIcon path={ic} /></div>
              <div className="lbl">{lbl}</div>
              <div className="val" style={{ color: P.accent }}>{val}</div>
              <div className="delta up">{dl}</div>
            </div>
          ))}
        </div>

        <div className="grid" style={{ gridTemplateColumns: "300px 1fr", alignItems: "start" }}>
          <div className="card">
            <h3>Assessment Queue</h3>
            <div className="sub">Select an MSME to view its Health Card</div>
            {APPLICANTS.map((a) => (
              <div key={a.id} onClick={() => setSel(a)}
                style={{ padding: "11px 12px", borderRadius: 10, cursor: "pointer", marginBottom: 6,
                  border: "1px solid " + (sel.id === a.id ? P.accent : "#e4ebe8"),
                  background: sel.id === a.id ? P.soft : "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="tname">{a.name}</span><RAG v={a.rag} />
                </div>
                <div className="tsub">{a.type}</div>
                <div style={{ marginTop: 4, fontSize: 11 }}>
                  {a.ntc && <span className="badge" style={{ background: "#fdecd9", color: "#a9721a" }}>New-to-Credit</span>}
                  <span style={{ color: "#7b8785", marginLeft: 6 }}>Score {a.score}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid" style={{ gap: 18 }}>
            <div className="grid g2">
              <div className="card">
                <h3>{sel.name}</h3>
                <div className="sub">{sel.id} · {sel.sector} · Turnover {sel.turnover} · Vintage {sel.vintage}</div>
                <div className="gauge-wrap" style={{ padding: "8px 0" }}>
                  <svg width="180" height="110" viewBox="0 0 180 110">
                    <path d="M15 100 A75 75 0 0 1 165 100" fill="none" stroke="#eef2f0" strokeWidth="14" strokeLinecap="round" />
                    <path d="M15 100 A75 75 0 0 1 165 100" fill="none" stroke={ragColor} strokeWidth="14" strokeLinecap="round"
                      strokeDasharray={`${(scorePct / 100) * 236} 236`} />
                  </svg>
                  <div style={{ marginTop: -34, textAlign: "center" }}>
                    <div className="gnum" style={{ color: ragColor }}>{sel.score}</div>
                    <div style={{ fontSize: 11, color: "#7b8785" }}>Composite Health Score (300 to 900)</div>
                  </div>
                  <div style={{ marginTop: 10 }}><RAG v={sel.rag} /></div>
                </div>
              </div>
              <div className="card">
                <h3>Dimension Profile</h3>
                <div className="sub">Six-factor breakdown</div>
                <ResponsiveContainer width="100%" height={200}>
                  <RadarChart data={radarData} outerRadius={72}>
                    <PolarGrid stroke="#e4ebe8" />
                    <PolarAngleAxis dataKey="dim" tick={{ fontSize: 10, fill: "#42504d" }} />
                    <Radar dataKey="v" stroke={P.accent} fill={P.accent} fillOpacity={0.28} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card">
              <h3>Alternate Data Sources <span className="badge">Consent-based · AA / ULI / OCEN</span></h3>
              <div className="sub">Ingested via Account Aggregator framework, DPDP-compliant consent ledger</div>
              <div className="grid g3">
                {SOURCES.map((s) => (
                  <div key={s.k} style={{ display: "flex", gap: 10, alignItems: "center", padding: "9px 11px", border: "1px solid #e4ebe8", borderRadius: 10 }}>
                    <span className="li-badge" style={{ background: s.ok ? "#e6f6ec" : "#fbeaea" }}>{s.ok ? SRC_ICON("#2F9E64") : WARN_ICON("#D64545")}</span>
                    <div><div style={{ fontWeight: 700, fontSize: 12.5 }}>{s.k}</div><div className="tsub">{s.s}</div></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid g2">
              <div className="card">
                <h3>Why this score, positive drivers</h3>
                <div className="sub">Top reason codes (SHAP)</div>
                {sel.pos.map((r, i) => (
                  <div className="list-ic" key={i}><span className="li-badge" style={{ background: "#e6f6ec" }}>{SRC_ICON("#2F9E64")}</span>{r}</div>
                ))}
              </div>
              <div className="card">
                <h3>Risk flags, negative drivers</h3>
                <div className="sub">Points the underwriter should review</div>
                {sel.neg.map((r, i) => (
                  <div className="list-ic" key={i}><span className="li-badge" style={{ background: "#fbeaea" }}>{WARN_ICON("#D64545")}</span>{r}</div>
                ))}
              </div>
            </div>

            <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: P.soft }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>Underwriter decision, human-in-the-loop</div>
                <div className="tsub">AI recommends; the credit officer decides. Every action is logged (maker-checker).</div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn ghost" style={{ background: "#fff", color: P.accent }}>Request more data</button>
                <button className="btn" style={{ background: "#F58220" }}>Override with reason</button>
                <button className="btn" style={{ background: P.accent }}>Approve recommendation</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
