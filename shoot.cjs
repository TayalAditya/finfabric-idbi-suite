const { chromium } = require("playwright");
const path = require("path");

const OUT = path.resolve(__dirname, "../../shots");
const BASE = "http://localhost:4173";
const routes = [
  ["home", "/"],
  ["udyamscore", "/udyamscore"],
  ["sahayak", "/sahayak"],
  ["leadsense", "/leadsense"],
  ["prahari", "/prahari"],
  ["sanchay", "/sanchay"],
];

(async () => {
  const fs = require("fs");
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  for (const [name, route] of routes) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(1400); // let charts animate/render
    await page.screenshot({ path: path.join(OUT, name + ".png"), fullPage: true });
    await page.screenshot({ path: path.join(OUT, name + "_fold.png"), fullPage: false });
    console.log("shot:", name);
  }
  await browser.close();
})();
