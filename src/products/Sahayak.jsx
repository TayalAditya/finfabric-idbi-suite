import { useState } from "react";
import { ProductHeader, Bar } from "../Shared";
import { PRODUCTS } from "../brand";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const P = PRODUCTS.sahayak;
const ALLOC = [
  { name: "Equity MF", value: 42, color: P.accent },
  { name: "Debt / FD", value: 28, color: P.accent2 },
  { name: "Gold", value: 12, color: "#C9A227" },
  { name: "NPS", value: 10, color: "#B7A6E0" },
  { name: "Liquid", value: 8, color: "#E0D7F3" },
];
const GROWTH = [
  { m: "Jan", v: 8.2 }, { m: "Feb", v: 8.6 }, { m: "Mar", v: 8.4 },
  { m: "Apr", v: 9.1 }, { m: "May", v: 9.6 }, { m: "Jun", v: 10.2 },
];
const GOALS = [
  { g: "Retirement Corpus", tgt: "₹2.4 Cr", pct: 38, eta: "2044" },
  { g: "Child Education", tgt: "₹45 L", pct: 61, eta: "2032" },
  { g: "Home Down-payment", tgt: "₹30 L", pct: 74, eta: "2028" },
];
const CHAT = [
  { who: "ai", t: "Namaste Rahul. I am Sahayak, your wealth companion. Your portfolio grew 2.1% this month. Want a quick review?" },
  { who: "me", t: "I have ₹50,000 to invest. What should I do?" },
  { who: "ai", t: "Based on your moderate risk profile (age 34) and your retirement goal, I suggest a SIP top-up: ₹30k into your existing equity index fund and ₹20k into a short-duration debt fund. This keeps your 65:35 equity-debt mix on track." },
  { who: "ai", t: "Note: this is a suitability-based suggestion for vanilla products. For the ELSS and insurance bundle you asked about earlier, I am connecting you with Priya, a certified Relationship Manager." },
];

function AvatarMark() {
  return (
    <div className="avatar-ring" style={{ background: `radial-gradient(circle at 40% 30%, ${P.accent2}, ${P.accent})` }}>
      <div className="pulse" style={{ background: P.accent2 }} />
      <svg viewBox="0 0 24 24" width="58" height="58" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" />
        <path d="M18.5 3.5 19 5l1.5.5L19 6l-.5 1.5L18 6l-1.5-.5L18 5z" />
      </svg>
    </div>
  );
}
const MicIcon = () => (<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke={P.accent} strokeWidth="2" strokeLinecap="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>);
const GoalIcon = () => (<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke={P.accent} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>);

export default function Sahayak() {
  const [lang, setLang] = useState("EN");
  return (
    <div style={{ "--pa": P.accent }}>
      <ProductHeader pkey="sahayak" right={<span className="phead-pill">Mobile-first · Hybrid advisory</span>} />
      <div className="wrap">
        <div className="grid" style={{ gridTemplateColumns: "340px 1fr", alignItems: "start" }}>
          <div className="card" style={{ background: `linear-gradient(180deg,#ffffff,${P.soft})` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3>Sahayak Advisor</h3>
              <select value={lang} onChange={(e) => setLang(e.target.value)}
                style={{ fontSize: 11.5, padding: "4px 8px", borderRadius: 8, border: "1px solid #e4ebe8" }}>
                <option>EN</option><option>हिंदी</option><option>தமிழ்</option><option>తెలుగు</option><option>বাংলা</option>
              </select>
            </div>
            <AvatarMark />
            <div style={{ textAlign: "center", margin: "12px 0" }}>
              <span className="chipk" style={{ background: P.soft, color: P.accent }}><MicIcon /> Voice + Text</span>
              <span className="chipk" style={{ background: P.soft, color: P.accent, marginLeft: 6 }}><GoalIcon /> Goal-based</span>
            </div>
            <div className="chat">
              {CHAT.map((m, i) => <div key={i} className={"msg " + m.who} style={m.who === "me" ? { background: P.accent } : {}}>{m.t}</div>)}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <input placeholder="Ask Sahayak" style={{ flex: 1, padding: "9px 12px", borderRadius: 9, border: "1px solid #e4ebe8", fontSize: 12.5 }} />
              <button className="btn" style={{ background: P.accent }}>Send</button>
            </div>
          </div>

          <div className="grid" style={{ gap: 18 }}>
            <div className="grid g4">
              <div className="stat" style={{ borderTop: `3px solid ${P.accent}` }}><div className="lbl">Net Worth</div><div className="val" style={{ color: P.accent }}>₹38.6L</div><div className="delta up">2.1% MoM</div></div>
              <div className="stat" style={{ borderTop: `3px solid ${P.accent}` }}><div className="lbl">Investments</div><div className="val" style={{ color: P.accent }}>₹24.2L</div><div className="delta up">10.2% XIRR</div></div>
              <div className="stat" style={{ borderTop: `3px solid ${P.accent}` }}><div className="lbl">Risk Profile</div><div className="val" style={{ fontSize: 20, color: P.accent }}>Moderate</div><div className="delta">Age-based, 34 yrs</div></div>
              <div className="stat" style={{ borderTop: `3px solid ${P.accent}` }}><div className="lbl">Suitability</div><div className="val" style={{ fontSize: 20, color: P.accent }}>Verified</div><div className="delta up">SEBI-aligned</div></div>
            </div>

            <div className="grid g2">
              <div className="card">
                <h3>Portfolio 360 View</h3>
                <div className="sub">Across IDBI and external holdings (via Account Aggregator)</div>
                <ResponsiveContainer width="100%" height={190}>
                  <PieChart>
                    <Pie data={ALLOC} dataKey="value" nameKey="name" innerRadius={45} outerRadius={72} paddingAngle={2}>
                      {ALLOC.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie><Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                  {ALLOC.map((a) => (
                    <span key={a.name} style={{ fontSize: 11, display: "flex", alignItems: "center", gap: 5 }}>
                      <i style={{ width: 9, height: 9, borderRadius: 2, background: a.color, display: "inline-block" }} />{a.name} {a.value}%
                    </span>
                  ))}
                </div>
              </div>
              <div className="card">
                <h3>Portfolio Value Trend</h3>
                <div className="sub">Last 6 months (₹ Lakhs, market-linked)</div>
                <ResponsiveContainer width="100%" height={210}>
                  <LineChart data={GROWTH}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eef2f0" />
                    <XAxis dataKey="m" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} domain={[7, 11]} />
                    <Tooltip /><Line type="monotone" dataKey="v" stroke={P.accent} strokeWidth={2.5} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card">
              <div className="sectitle acc">Goal-based Planning</div>
              <div className="grid g3">
                {GOALS.map((g) => (
                  <div key={g.g} className="softcard">
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{g.g}</div>
                    <div className="tsub" style={{ marginBottom: 8 }}>Target {g.tgt} · by {g.eta}</div>
                    <Bar pct={g.pct} color={P.accent} />
                    <div style={{ fontSize: 11, marginTop: 5, color: "#7b8785" }}>{g.pct}% funded</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ background: P.soft, borderColor: P.accent2 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div className="iconbox" style={{ background: P.accent }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>Hybrid advisory: AI plus human RM</div>
                  <div className="tsub">Vanilla products: AI advises and executes. Regulated or complex cases: warm hand-off to a certified Relationship Manager as a qualified lead.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
