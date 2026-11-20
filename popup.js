// popup.js - Maeve Status and Quick Toggle

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("btn-toggle");
  const configStatusEl = document.getElementById("config-status");

  // Query background service for Groq key status
  chrome.runtime.sendMessage({ action: "GET_STATUS" }, (res) => {
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

  // Toggle Maeve HUD on active webpage
  toggleBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "TOGGLE_ACTIVE_TAB" }, () => {
      window.close();
    });
  });
});
