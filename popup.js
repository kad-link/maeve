// popup.js - Maeve Status and Quick Toggle

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("btn-toggle");
  const configStatusEl = document.getElementById("config-status");

  if (typeof chrome !== "undefined" && chrome.runtime?.sendMessage) {
    chrome.runtime.sendMessage({ action: "GET_STATUS" }, (res) => {
      if (chrome.runtime?.lastError) return;
      if (res) {
        if (res.hasGroq) {
          configStatusEl.textContent = "Groq Ready";
          configStatusEl.className = "pill pill-green";
        } else {
          configStatusEl.textContent = "Missing Key in .env";
          configStatusEl.className = "pill pill-amber";
        }
      }
    });

    toggleBtn?.addEventListener("click", () => {
      chrome.runtime.sendMessage({ action: "TOGGLE_ACTIVE_TAB" }, () => {
        if (chrome.runtime?.lastError) {}
        window.close();
      });
    });
  }
});
