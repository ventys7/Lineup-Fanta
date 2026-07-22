"use strict";
async function bsdFetch(url, options, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, options);
      if (res.ok) return await res.json();
      if (res.status === 429) await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    } catch (e) {
      if (i === retries) throw e;
    }
  }
}
module.exports = { bsdFetch };
