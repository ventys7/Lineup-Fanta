const {
  parsePublishedCalendar,
  toCalendarCsv
} = require("../lib/calendar-parser.cjs");

const CALENDAR_SOURCES = Object.freeze({
  fp: Object.freeze({
    sourceUrl: process.env.FP_CALENDAR_DOC_URL || "https://docs.google.com/document/d/e/2PACX-1vSwwHhS8hSRFVrlz0mwYgjzq7UG9aTEFuHd7Qh1RA4CmnXQ11bCs59I6VTsusSAxW_m88a99vyHNngH/pub",
    expectedMatches: 4
  }),
  pd: Object.freeze({
    sourceUrl: process.env.PD_CALENDAR_DOC_URL || "",
    expectedMatches: 4
  })
});

function setNoStore(res) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
  res.setHeader("CDN-Cache-Control", "no-store");
  res.setHeader("Vercel-CDN-Cache-Control", "no-store");
  res.setHeader("Surrogate-Control", "no-store");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
}

async function fetchPublishedDocument(sourceUrl) {
  const url = new URL(sourceUrl);
  url.searchParams.set("_lf", String(Date.now()));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    return await fetch(url, {
      method: "GET",
      cache: "no-store",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "Accept": "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
        "Cache-Control": "no-cache, no-store, max-age=0",
        "Pragma": "no-cache",
        "User-Agent": "Mozilla/5.0 Lineup-Fanta/1.0"
      }
    });
  } finally {
    clearTimeout(timeout);
  }
}

module.exports = async function handler(req, res) {
  setNoStore(res);

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Metodo non consentito" });
  }

  const leagueId = req.query.league === "pd" ? "pd" : "fp";
  const config = CALENDAR_SOURCES[leagueId];

  try {
    if (!/^https?:\/\//i.test(config.sourceUrl)) {
      return res.status(404).json({
        error: "Calendario della lega non configurato"
      });
    }

    const response = await fetchPublishedDocument(config.sourceUrl);

    if (!response.ok) {
      throw new Error(`Google Docs HTTP ${response.status}`);
    }

    const html = await response.text();
    const matchdays = parsePublishedCalendar(
      html,
      config.expectedMatches
    );

    if (matchdays.length === 0) {
      throw new Error(
        "Nessuna giornata riconosciuta nel documento pubblicato"
      );
    }

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    return res.status(200).send(toCalendarCsv(matchdays));
  } catch (error) {
    console.error("calendar live fetch error", error);

    return res.status(502).json({
      error: "Calendario live non disponibile",
      detail: String(error?.message ?? error ?? "")
    });
  }
};
