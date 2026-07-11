import { NavLink } from "react-router-dom";

const NAV = [
  { to: "/", ic: "◆", label: "Suite Home", end: true },
  { to: "/udyamscore", ic: "\u{1F4B3}", label: "UdyamScore", note: "PS-03 MSME Health" },
  { to: "/sahayak", ic: "\u{1F464}", label: "Sahayak", note: "PS-01 Wealth AI" },
  { to: "/leadsense", ic: "\u{1F3AF}", label: "LeadSense", note: "PS-02 Lead Intel" },
  { to: "/prahari", ic: "\u{1F6E1}", label: "Prahari", note: "PS-04 Early Warning" },
  { to: "/sanchay", ic: "⚙", label: "Sanchay", note: "PS-05 Recon Copilot" },
];

export function Sidebar() {
  return (
    <aside className="side">
      <div className="brand">
        <div className="logo">C</div>
        <div>
          <h1>Cognite Labs</h1>
          <small>IDBI Innovate 2026</small>
        </div>
      </div>
      <div className="tag">Solution Suite</div>
      <nav className="nav">
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end}
            className={({ isActive }) => (isActive ? "active" : "")}>
            <span className="ic">{n.ic}</span>
            <span>
              {n.label}
              {n.note && <small style={{ display: "block", fontSize: 9.5, opacity: .6 }}>{n.note}</small>}
            </span>
          </NavLink>
        ))}
      </nav>
      <div className="foot">
        Built for IDBI Innovate 2026<br />Team Lead: Aditya Tayal<br />
        <span style={{ opacity: .8 }}>AWS-native · RBI/DPDP-aligned</span>
      </div>
    </aside>
  );
}

export function Topbar({ crumb, title, pill }) {
  return (
    <div className="topbar">
      <div>
        <div className="crumb">{crumb}</div>
        <h2>{title}</h2>
      </div>
      {pill && <span className="pill">{pill}</span>}
    </div>
  );
}

export function Layout({ children }) {
  return (
    <div className="app">
      <Sidebar />
      <div className="main">{children}</div>
    </div>
  );
}

export function Stat({ label, value, delta, up }) {
  return (
    <div className="stat">
      <div className="lbl">{label}</div>
      <div className="val">{value}</div>
      {delta && <div className={"delta " + (up ? "up" : "down")}>{up ? "▲" : "▼"} {delta}</div>}
    </div>
  );
}

export function RAG({ v }) {
  const map = { G: ["g", "Green · Low Risk"], A: ["a", "Amber · Watch"], R: ["r", "Red · High Risk"] };
  const [c, t] = map[v] || map.A;
  return <span className={"rag " + c}>{t}</span>;
}

export function Bar({ pct, color }) {
  return <div className="bar"><i style={{ width: pct + "%", background: color }} /></div>;
}
