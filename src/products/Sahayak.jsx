import { useState } from "react";
import { Topbar, Bar } from "../Shared";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const ALLOC = [
  { name: "Equity MF", value: 42, color: "#046A38" },
  { name: "Debt / FD", value: 28, color: "#0e7c70" },
  { name: "Gold", value: 12, color: "#F58220" },
  { name: "NPS", value: 10, color: "#8bc4a8" },
  { name: "Liquid", value: 8, color: "#c9e3d6" },
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
  { who: "ai", t: "नमस्ते Rahul! I'm Sahayak, your wealth companion. Your portfolio grew 2.1% this month. Want a quick review?" },
  { who: "me", t: "I have ₹50,000 to invest. What should I do?" },
  { who: "ai", t: "Based on your moderate risk profile (age 34) and your Retirement goal, I'd suggest a SIP top-up: ₹30k into your existing equity index fund and ₹20k into a short-duration debt fund. This keeps your 65:35 equity-debt mix on track." },
  { who: "ai", t: "⚠️ This is a suitability-based suggestion for vanilla products. For the ELSS + insurance bundle you asked about earlier, I'm connecting you with Priya, a certified Relationship Manager." },
];

export default function Sahayak() {
  const [lang, setLang] = useState("EN");
  return (
    <>
      <Topbar crumb="Solution Suite · PS-01 Digital Wealth Management" title="Sahayak — AI Avatar Wealth Companion" pill="Mobile-first · Hybrid" />
      <div className="wrap">
        <div className="grid" style={{ gridTemplateColumns: "340px 1fr", alignItems: "start" }}>
          {/* Avatar chat */}
          <div className="card" style={{ background: "linear-gradient(180deg,#ffffff,#f2f8f4)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3>Sahayak</h3>
              <select value={lang} onChange={(e) => setLang(e.target.value)}
                style={{ fontSize: 11.5, padding: "4px 8px", borderRadius: 8, border: "1px solid #e4ebe8" }}>
                <option>EN</option><option>हिंदी</option><option>தமிழ்</option><option>తెలుగు</option><option>বাংলা</option>
              </select>
            </div>
            <div className="avatar">🧑‍💼</div>
            <div style={{ textAlign: "center", margin: "10px 0" }}>
              <span className="chip">🎙 Voice + Text</span><span className="chip">Goal-based</span>
            </div>
            <div className="chat">
              {CHAT.map((m, i) => <div key={i} className={"msg " + m.who}>{m.t}</div>)}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <input placeholder="Ask Sahayak…" style={{ flex: 1, padding: "9px 12px", borderRadius: 9, border: "1px solid #e4ebe8", fontSize: 12.5 }} />
              <button className="btn">Send</button>
            </div>
          </div>

          {/* Dashboard */}
          <div className="grid" style={{ gap: 18 }}>
            <div className="grid g4">
              <div className="stat"><div className="lbl">Net Worth</div><div className="val">₹38.6L</div><div className="delta up">▲ 2.1% MoM</div></div>
              <div className="stat"><div className="lbl">Investments</div><div className="val">₹24.2L</div><div className="delta up">▲ 10.2% XIRR</div></div>
              <div className="stat"><div className="lbl">Risk Profile</div><div className="val" style={{ fontSize: 20 }}>Moderate</div><div className="delta">Age-based · 34 yrs</div></div>
              <div className="stat"><div className="lbl">Suitability</div><div className="val" style={{ fontSize: 20 }}>Verified ✓</div><div className="delta up">SEBI-aligned</div></div>
            </div>

            <div className="grid g2">
              <div className="card">
                <h3>Portfolio 360° View</h3>
                <div className="sub">Across IDBI + external holdings (via Account Aggregator)</div>
                <ResponsiveContainer width="100%" height={190}>
                  <PieChart>
                    <Pie data={ALLOC} dataKey="value" nameKey="name" innerRadius={45} outerRadius={72} paddingAngle={2}>
                      {ALLOC.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip />
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
                    <Tooltip /><Line type="monotone" dataKey="v" stroke="#F58220" strokeWidth={2.5} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card">
              <div className="sectitle">Goal-based Planning</div>
              <div className="grid g3">
                {GOALS.map((g) => (
                  <div key={g.g} style={{ border: "1px solid #e4ebe8", borderRadius: 12, padding: 14 }}>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{g.g}</div>
                    <div className="tsub" style={{ marginBottom: 8 }}>Target {g.tgt} · by {g.eta}</div>
                    <Bar pct={g.pct} />
                    <div style={{ fontSize: 11, marginTop: 5, color: "#7b8785" }}>{g.pct}% funded</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ background: "#fff7ef", borderColor: "#fcd9b3" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ fontSize: 22 }}>🤝</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>Hybrid advisory — AI + human RM</div>
                  <div className="tsub">Vanilla products: AI advises & executes. Regulated/complex cases: warm hand-off to a certified Relationship Manager as a qualified lead.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
