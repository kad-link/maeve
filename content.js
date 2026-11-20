// content.js - Maeve: Minimal Injected Floating HUD for Any Website

(function () {
  // Prevent duplicate injection
  if (document.getElementById("maeve-hud-host")) {
    return;
  }

  // Create isolated container
  const host = document.createElement("div");
  host.id = "maeve-hud-host";
  host.style.position = "static";
  host.style.zIndex = "2147483647";
  document.documentElement.appendChild(host);

  const shadow = host.attachShadow({ mode: "open" });

  // Injected CSS Styles
  const style = document.createElement("style");
  style.textContent = `
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    #widget {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 380px;
      min-width: 300px;
      max-width: 700px;
      min-height: 44px;
      max-height: 480px;
      background: rgba(20, 20, 24, 0.96);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 12px;
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);
      color: #f3f4f6;
      display: none; /* Hidden until toggled */
      flex-direction: column;
      overflow: hidden;
      transition: box-shadow 0.2s ease, border-color 0.2s ease;
      z-index: 2147483647;
    }

    #widget:focus-within {
      border-color: rgba(99, 102, 241, 0.6);
      box-shadow: 0 14px 40px rgba(0, 0, 0, 0.6), 0 0 0 2px rgba(99, 102, 241, 0.25);
    }

    /* Top drag bar */
    #drag-header {
      height: 24px;
      background: rgba(28, 28, 34, 0.95);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      cursor: grab;
      user-select: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 8px;
    }

    #drag-header:active {
      cursor: grabbing;
    }

    .header-title {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.5px;
      color: #d1d5db;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .status-dot {
      width: 6px;
      height: 6px;
      background: #10b981;
      border-radius: 50%;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .icon-btn {
      background: transparent;
      border: none;
      color: #9ca3af;
      cursor: pointer;
      font-size: 11px;
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
      transition: all 0.15s ease;
    }

    .icon-btn:hover {
      background: rgba(255, 255, 255, 0.12);
      color: #ffffff;
    }

    /* Input area */
    #input-container {
      display: flex;
      align-items: center;
      padding: 6px 10px;
      background: transparent;
    }

    #prompt-input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      color: #ffffff;
      font-size: 13.5px;
      line-height: 1.4;
      padding: 2px 4px;
    }

    #prompt-input::placeholder {
      color: #6b7280;
    }

    #send-btn {
      background: #4f46e5;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 4px 10px;
      font-size: 11.5px;
      font-weight: 500;
      cursor: pointer;
      margin-left: 6px;
      display: flex;
      align-items: center;
      gap: 3px;
      transition: background 0.15s ease;
    }

    #send-btn:hover {
      background: #4338ca;
    }

    #send-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Response Card (few lines view) */
    #response-container {
      display: none;
      padding: 8px 12px 10px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(16, 16, 20, 0.75);
      flex-direction: column;
      gap: 6px;
    }

    #response-content {
      font-size: 13px;
      line-height: 1.45;
      color: #e5e7eb;
      max-height: 140px;
      overflow-y: auto;
      white-space: pre-wrap;
      word-break: break-word;
    }

    #response-content::-webkit-scrollbar {
      width: 4px;
    }

    #response-content::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
    }

    .response-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 10.5px;
      color: #6b7280;
      padding-top: 4px;
      border-top: 1px dashed rgba(255, 255, 255, 0.06);
    }

    .copy-btn {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #9ca3af;
      padding: 2px 7px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 10px;
      transition: all 0.15s;
    }

    .copy-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #ffffff;
    }

    /* Loading Spinner */
    .spinner {
      display: inline-block;
      width: 12px;
      height: 12px;
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      border-top-color: #ffffff;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Resize Handle */
    #resize-handle {
      position: absolute;
      right: 2px;
      bottom: 2px;
      width: 10px;
      height: 10px;
      cursor: nwse-resize;
      background: linear-gradient(135deg, transparent 50%, rgba(255, 255, 255, 0.25) 50%);
      border-bottom-right-radius: 4px;
    }
  `;

  // HTML Structure
  const iconUrl = chrome.runtime.getURL("icons/icon16.png");
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <div id="widget">
      <!-- Drag Header -->
      <div id="drag-header">
        <div class="header-title">
          <img src="${iconUrl}" width="14" height="14" style="border-radius: 3px; vertical-align: middle; object-fit: contain;" alt="Maeve" />
          <span class="status-dot"></span>
          <span>Maeve</span>
        </div>
        <div class="header-actions">
          <button class="icon-btn" id="btn-close" title="Close (Esc)">✕</button>
        </div>
      </div>

      <!-- Input Bar -->
      <div id="input-container">
        <input type="text" id="prompt-input" placeholder="Ask Maeve... (Enter to send, Esc to close)" autocomplete="off" />
        <button id="send-btn">Ask</button>
      </div>

      <!-- Compact Response Box -->
      <div id="response-container">
        <div id="response-content"></div>
        <div class="response-footer">
          <span id="response-meta">Maeve</span>
          <button class="copy-btn" id="btn-copy">Copy</button>
        </div>
      </div>

      <!-- Corner Resize Handle -->
      <div id="resize-handle"></div>
    </div>
  `;

  shadow.appendChild(style);
  shadow.appendChild(wrapper);

  // References
  const widget = shadow.getElementById("widget");
  const dragHeader = shadow.getElementById("drag-header");
  const resizeHandle = shadow.getElementById("resize-handle");
  const promptInput = shadow.getElementById("prompt-input");
  const sendBtn = shadow.getElementById("send-btn");
  const responseContainer = shadow.getElementById("response-container");
  const responseContent = shadow.getElementById("response-content");
  const responseMeta = shadow.getElementById("response-meta");
  const btnClose = shadow.getElementById("btn-close");
  const btnCopy = shadow.getElementById("btn-copy");

  // Prevent host webpage shortcuts (e.g. YouTube 'k', Twitter 'j', etc.)
  widget.addEventListener("keydown", (e) => {
    e.stopPropagation();
    if (e.key === "Escape") {
      hideWidget();
    }
  });
  widget.addEventListener("keyup", (e) => e.stopPropagation());
  widget.addEventListener("keypress", (e) => e.stopPropagation());

  // Dragging Implementation
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let widgetInitX = 0;
  let widgetInitY = 0;

  dragHeader.addEventListener("mousedown", (e) => {
    if (e.button !== 0 || e.target.closest(".icon-btn")) return;
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;

    const rect = widget.getBoundingClientRect();
    widgetInitX = rect.left;
    widgetInitY = rect.top;

    widget.style.left = `${widgetInitX}px`;
    widget.style.top = `${widgetInitY}px`;
    widget.style.bottom = "auto";
    widget.style.right = "auto";

    document.addEventListener("mousemove", onDragMove);
    document.addEventListener("mouseup", onDragEnd);
    e.preventDefault();
  });

  function onDragMove(e) {
    if (!isDragging) return;
    let newX = widgetInitX + (e.clientX - dragStartX);
    let newY = widgetInitY + (e.clientY - dragStartY);

    const maxX = window.innerWidth - widget.offsetWidth - 5;
    const maxY = window.innerHeight - widget.offsetHeight - 5;
    newX = Math.max(5, Math.min(maxX, newX));
    newY = Math.max(5, Math.min(maxY, newY));

    widget.style.left = `${newX}px`;
    widget.style.top = `${newY}px`;
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    document.removeEventListener("mousemove", onDragMove);
    document.removeEventListener("mouseup", onDragEnd);

    // Save position
    chrome.storage.local.set({
      maeve_x: widget.style.left,
      maeve_y: widget.style.top
    }).catch(() => {});
  }

  // Resizing Implementation
  let isResizing = false;
  let resizeStartX = 0;
  let resizeStartY = 0;
  let initWidth = 0;

  resizeHandle.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    isResizing = true;
    resizeStartX = e.clientX;
    resizeStartY = e.clientY;
    initWidth = widget.offsetWidth;

    document.addEventListener("mousemove", onResizeMove);
    document.addEventListener("mouseup", onResizeEnd);
    e.preventDefault();
  });

  function onResizeMove(e) {
    if (!isResizing) return;
    const newWidth = Math.max(300, Math.min(800, initWidth + (e.clientX - resizeStartX)));
    widget.style.width = `${newWidth}px`;

    if (responseContainer.style.display === "flex") {
      const addedHeight = e.clientY - resizeStartY;
      const newMaxH = Math.max(80, Math.min(360, 140 + addedHeight));
      responseContent.style.maxHeight = `${newMaxH}px`;
    }
  }

  function onResizeEnd() {
    if (!isResizing) return;
    isResizing = false;
    document.removeEventListener("mousemove", onResizeMove);
    document.removeEventListener("mouseup", onResizeEnd);

    chrome.storage.local.set({
      maeve_width: widget.style.width
    }).catch(() => {});
  }

  // Open & Close Widget Functions
  async function showWidget() {
    try {
      const saved = await chrome.storage.local.get(["maeve_x", "maeve_y", "maeve_width"]);
      if (saved.maeve_x && saved.maeve_y) {
        widget.style.left = saved.maeve_x;
        widget.style.top = saved.maeve_y;
        widget.style.bottom = "auto";
        widget.style.right = "auto";
      }
      if (saved.maeve_width) {
        widget.style.width = saved.maeve_width;
      }
    } catch (_) {}

    widget.style.display = "flex";
    promptInput.focus();
    promptInput.select();
  }

  function hideWidget() {
    widget.style.display = "none";
  }

  function toggleWidget() {
    const isHidden = window.getComputedStyle(widget).display === "none";
    if (isHidden) {
      showWidget();
    } else {
      hideWidget();
    }
  }

  btnClose.addEventListener("click", hideWidget);

  // Sending Prompts
  async function submitPrompt() {
    const text = promptInput.value.trim();
    if (!text) return;

    sendBtn.disabled = true;
    sendBtn.innerHTML = `<span class="spinner"></span>`;
    responseContainer.style.display = "flex";
    responseContent.textContent = "Thinking...";
    responseContent.style.color = "#9ca3af";
    responseMeta.textContent = "Generating...";

    chrome.runtime.sendMessage(
      {
        action: "QUERY_AI",
        prompt: text
      },
      (res) => {
        sendBtn.disabled = false;
        sendBtn.innerHTML = "Ask";

        if (!res) {
          responseContent.textContent = "Error: Could not reach Maeve background service. Please reload the extension or page.";
          responseContent.style.color = "#f87171";
          return;
        }

        if (res.success) {
          responseContent.textContent = res.text;
          responseContent.style.color = "#f3f4f6";
          responseMeta.textContent = "Maeve";
        } else {
          responseContent.textContent = res.error || "An error occurred.";
          responseContent.style.color = "#f87171";
          responseMeta.textContent = "Error";
        }
      }
    );
  }

  sendBtn.addEventListener("click", submitPrompt);
  promptInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitPrompt();
    }
  });

  // Copy button
  btnCopy.addEventListener("click", () => {
    const text = responseContent.textContent;
    if (!text || text === "Thinking...") return;
    navigator.clipboard.writeText(text).then(() => {
      btnCopy.textContent = "Copied!";
      setTimeout(() => {
        btnCopy.textContent = "Copy";
      }, 1500);
    });
  });

  // Listen for toggle command
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "TOGGLE_FLOATING_BAR") {
      toggleWidget();
      sendResponse({ success: true });
    }
  });
})();
