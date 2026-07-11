import { NavLink } from "react-router-dom";
import { PRODUCTS, Icons, BRAND } from "./brand";
import markUrl from "./assets/finfabric_mark.png";

const ORDER = ["udyamscore", "sahayak", "leadsense", "prahari", "sanchay"];

export function Sidebar({ active }) {
  const acc = active ? PRODUCTS[active].accent : BRAND.suite.accent;
  const acc2 = active ? PRODUCTS[active].accent2 : BRAND.suite.accent2;
  return (
    <aside className="side" style={{ background: `linear-gradient(180deg, ${acc} 0%, ${acc2} 100%)` }}>
      <NavLink to="/" className="brand">
        <div className="logo" style={{ background: "#fff", padding: 4 }}>
          <img src={markUrl} alt="FinFabric" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <div>
          <h1>{BRAND.suite.name}</h1>
          <small>{BRAND.suite.tag}</small>
        </div>
      </NavLink>
      <div className="tag">Solution Suite</div>
      <nav className="nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
          <span className="ic">{Icons.home({ size: 17 })}</span><span>Suite Home</span>
        </NavLink>
        {ORDER.map((k) => {
          const p = PRODUCTS[k];
          return (
            <NavLink key={k} to={"/" + k} className={({ isActive }) => (isActive ? "active" : "")}>
              <span className="ic">{Icons[k]({ size: 17 })}</span>
              <span>{p.name}<small style={{ display: "block", fontSize: 9.5, opacity: .6 }}>{p.ps} {p.tagline.split(" ").slice(0, 2).join(" ")}</small></span>
            </NavLink>
          );
        })}
      </nav>
      <div className="foot">
        Built for IDBI Innovate 2026<br />Team Lead: Aditya Tayal<br />
        <span style={{ opacity: .8 }}>AWS-native, RBI/DPDP-aligned</span>
      </div>
    </aside>
  );
}

// Product header band: shows the product's own logo mark, name, tagline, in its accent.
export function ProductHeader({ pkey, right }) {
  const p = PRODUCTS[pkey];
  return (
    <div className="phead" style={{ background: `linear-gradient(100deg, ${p.accent}, ${p.accent2})` }}>
      <div className="phead-l">
        <div className="phead-mark">{Icons[pkey]({ size: 26 })}</div>
        <div>
          <div className="phead-name">{p.name}</div>
          <div className="phead-tag">{p.ps} · {p.tagline}</div>
        </div>
      </div>
      {right && <div className="phead-r">{right}</div>}
    </div>
  );
}

export function Layout({ children, active }) {
  return (
    <div className="app">
      <Sidebar active={active} />
      <div className="main">{children}</div>
    </div>
  );
}

export function Stat({ label, value, delta, up, accent }) {
  return (
    <div className="stat" style={accent ? { borderTop: `3px solid ${accent}` } : {}}>
      <div className="lbl">{label}</div>
      <div className="val" style={accent ? { color: accent } : {}}>{value}</div>
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
