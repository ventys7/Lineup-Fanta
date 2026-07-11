(function setupLineupDebug(global) {
  "use strict";

  const STORAGE_KEY = "lineup:debug";

  function enabled() {
    try {
      return new URLSearchParams(global.location.search).get("debug") === "1"
        || global.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  }

  function write(method, namespace, message, details) {
    if (method === "debug" && !enabled()) return;
    const prefix = `[Lineup:${namespace}]`;
    if (details === undefined) console[method](prefix, message);
    else console[method](prefix, message, details);
  }

  function logger(namespace) {
    return Object.freeze({
      debug(message, details) { write("debug", namespace, message, details); },
      info(message, details) { write("info", namespace, message, details); },
      warn(message, details) { write("warn", namespace, message, details); },
      error(message, details) { write("error", namespace, message, details); }
    });
  }

  global.LineupDebug = Object.freeze({
    enabled,
    logger,
    setEnabled(value) {
      try { global.localStorage.setItem(STORAGE_KEY, value ? "1" : "0"); } catch {}
    }
  });

  global.addEventListener("error", (event) => {
    logger("window").error("unhandled error", event.error || event.message);
  });

  global.addEventListener("unhandledrejection", (event) => {
    logger("window").error("unhandled rejection", event.reason);
  });
})(window);
