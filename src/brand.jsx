// Per-product brand system: distinct accent, gradient, icon mark, and personality.
// Each product reads as its own app while sharing the FinFabric family.

export const BRAND = {
  suite: {
    name: "FinFabric",
    tag: "IDBI Innovate 2026",
    accent: "#046A38",
    accent2: "#0B5A52",
  },
};

// Inline SVG icon marks (stroke-based, 24x24 viewBox). Distinct per product.
export const Icons = {
  // Sahayak: a chat/advisor spark
  sahayak: (p = {}) => (
    <svg viewBox="0 0 24 24" width={p.size || 22} height={p.size || 22} fill="none"
      stroke={p.color || "#fff"} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" />
      <path d="M12 8v4" /><path d="M12 15h.01" />
    </svg>
  ),
  // LeadSense: a radar / target funnel
  leadsense: (p = {}) => (
    <svg viewBox="0 0 24 24" width={p.size || 22} height={p.size || 22} fill="none"
      stroke={p.color || "#fff"} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" fill={p.color || "#fff"} />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    </svg>
  ),
  // UdyamScore: a shield with a rising bar (health/score)
  udyamscore: (p = {}) => (
    <svg viewBox="0 0 24 24" width={p.size || 22} height={p.size || 22} fill="none"
      stroke={p.color || "#fff"} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5z" />
      <path d="M9 13v3M12 10v6M15 12v4" />
    </svg>
  ),
  // Prahari: a watch/alert eye-shield
  prahari: (p = {}) => (
    <svg viewBox="0 0 24 24" width={p.size || 22} height={p.size || 22} fill="none"
      stroke={p.color || "#fff"} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5z" />
      <path d="M8.5 12.5 11 15l4.5-5" />
    </svg>
  ),
  // Sanchay: interlocking gears / reconciliation
  sanchay: (p = {}) => (
    <svg viewBox="0 0 24 24" width={p.size || 22} height={p.size || 22} fill="none"
      stroke={p.color || "#fff"} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 7h9M13 7l-3-3M13 7l-3 3" /><path d="M20 17h-9M11 17l3 3M11 17l3-3" />
    </svg>
  ),
  home: (p = {}) => (
    <svg viewBox="0 0 24 24" width={p.size || 20} height={p.size || 20} fill="none"
      stroke={p.color || "#fff"} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
    </svg>
  ),
};

export const PRODUCTS = {
  sahayak: {
    key: "sahayak", name: "Sahayak", ps: "PS-01",
    tagline: "AI Avatar Wealth Companion",
    accent: "#6C4AB6", accent2: "#8B6FD6", soft: "#F1ECFA",
    layout: "advisor",
  },
  leadsense: {
    key: "leadsense", name: "LeadSense", ps: "PS-02",
    tagline: "Intent x Capacity Lead Intelligence",
    accent: "#0E7C86", accent2: "#16A6B2", soft: "#E6F5F6",
    layout: "analytics",
  },
  udyamscore: {
    key: "udyamscore", name: "UdyamScore", ps: "PS-03",
    tagline: "MSME Financial Health Card",
    accent: "#046A38", accent2: "#0B8A4C", soft: "#E6F2EC",
    layout: "card",
  },
  prahari: {
    key: "prahari", name: "Prahari", ps: "PS-04",
    tagline: "12-Month Default Early Warning",
    accent: "#B3452F", accent2: "#D65B41", soft: "#FBEAE5",
    layout: "monitor",
  },
  sanchay: {
    key: "sanchay", name: "Sanchay", ps: "PS-05",
    tagline: "Agentic Reconciliation Copilot",
    accent: "#1F4E8C", accent2: "#2E6DBE", soft: "#E8EFF9",
    layout: "console",
  },
};
