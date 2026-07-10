window.LINEUP_LEAGUES = Object.freeze({
  fp: Object.freeze({
    id: "fp",
    name: "PianginaCUP",
    label: "Fanta Premier",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    csvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vR1qCSKkMUZ6W_-_OG8qjTYEQTwF4aPqgtg3XjOGqphRHRDlnFynozJsC0t6WeFjY8XCXjr-R1ZVaww/pub?gid=556989324&single=true&output=csv",
    leagueData: Object.freeze({
      standingsCsvUrl: "/data/fp/classifica.csv",
      calendarCsvUrl: "/data/fp/calendario.csv",
      calendarDocUrl: "https://docs.google.com/document/d/e/2PACX-1vSwwHhS8hSRFVrlz0mwYgjzq7UG9aTEFuHd7Qh1RA4CmnXQ11bCs59I6VTsusSAxW_m88a99vyHNngH/pub",
      calendarExpectedMatches: 4,
      calendarCompetitionLabel: "Premier League",
      matchdayLinksKey: "fp"
    }),
    identity: Object.freeze({
      id: "fp",
      logo: "assets/identity/fp-logo.png",
      favicon: "/fp/favicon.svg?v=8",
      faviconType: "image/svg+xml",
      appleTouchIcon: "/fp/apple-touch-icon.png?v=5"
    }),
    theme: {
      primary: "#7c3aed",
      primaryLight: "#a855f7",
      primaryBg: "#f5f0ff",
      primaryBorder: "#ede9fe",
      background: "#f8f7ff"
    }
  }),

  pd: Object.freeze({
    id: "pd",
    name: "LaLigaCUP",
    label: "Fanta Liga",
    flag: "🇪🇸",
    csvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSlE8BNQI1bOPsOlg2aO7TTHr0RpJD9rCj_EP3QRpsBho6D3s_ZCtmMibhbjx0Ehc5jexbagbf_t9j0/pub?gid=1583604307&single=true&output=csv",
    leagueData: Object.freeze({
      standingsCsvUrl: "/data/pd/classifica.csv",
      calendarCsvUrl: "/data/pd/calendario.csv",
      calendarDocUrl: "",
      calendarExpectedMatches: 4,
      calendarCompetitionLabel: "Liga",
      matchdayLinksKey: "pd"
    }),
    identity: Object.freeze({
      id: "pd",
      logo: "assets/identity/pd-logo.png",
      favicon: "/pd/favicon.svg?v=8",
      faviconType: "image/svg+xml",
      appleTouchIcon: "/pd/apple-touch-icon.png?v=5"
    }),
    theme: {
      primary: "#b91c1c",
      primaryLight: "#ef4444",
      primaryBg: "#fff1f2",
      primaryBorder: "#fecdd3",
      background: "#fffafa"
    }
  })
});
