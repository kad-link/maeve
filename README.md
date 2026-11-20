# Floating AI Bar (Chrome Extension)

A lightweight, movable, resizable, compact floating AI chat bar that runs on **any website** in Chrome. It gives you instant access to **ChatGPT, Google Gemini, Groq, or local Ollama models** with concise, straight-to-the-point answers (just 2-4 lines).

---

## Features

- **Any Website**: Injected safely inside an isolated **Shadow DOM** so it never breaks webpage styles and webpage styles never break it.
- **Movable**: Smooth drag-and-drop from the top header bar, with automatic boundary protection (never gets lost off-screen) and position memory across tabs.
- **Resizable**: Corner handle to resize width and response height to your preference.
- **Compact Floating Bar**:
  - Starts minimal and stays out of the way.
  - Generates concise 2-4 sentence responses.
- **Easy Open / Close**:
  - Global Shortcut: <kbd>Command + Shift + K</kbd> (Mac) or <kbd>Alt + J</kbd> (Windows/Linux).
  - Press <kbd>Esc</kbd> or click **✕** to dismiss immediately.
  - Click **⚡ Toggle Bar on Active Tab** in the extension popup menu.
- **Multi-Model Support**:
  - **Google Gemini**: `gemini-2.5-flash` (Fast, generous free tier)
  - **OpenAI**: `gpt-4o-mini`, `gpt-4o`, `gpt-3.5-turbo`
  - **Groq**: `llama-3.3-70b-versatile`, `llama-3.1-8b-instant`
  - **Ollama**: Local offline models (`http://localhost:11434`, e.g. `llama3`, `mistral`)
  - **Custom / OpenRouter**: Any OpenAI-compatible REST API.
- **One-Click Copy**: Copy responses with a single click.
- **In-Widget Settings (⚙)**: Change your API key or model directly from the floating bar without ever leaving your active page.

---

## Quick Installation (30 Seconds)

1. Open Google Chrome and go to `chrome://extensions/`.
2. Toggle on **Developer mode** in the top-right corner.
3. Click the **Load unpacked** button in the top-left.
4. Select this directory:
   ```
   /Users/sricharan/Documents/miniproject/tudum-releases
   ```
5. The **Floating AI Bar** icon will appear in your Chrome toolbar!

---

## Configuration

1. Click the **Floating AI Bar** icon in your Chrome toolbar (or click the ⚙️ icon on the floating bar).
2. Choose your preferred **Provider**:
   - **Google Gemini** (Recommended): Grab a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
   - **OpenAI**: Enter your OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys).
   - **Groq**: Enter your Groq API key from [Groq Console](https://console.groq.com/keys).
   - **Ollama**: No API key required! Just ensure Ollama is running (`ollama run llama3`).
3. Click **Save Settings**.

---

## How to Use

1. Open any website (e.g. Wikipedia, GitHub, Twitter, news, or `test.html`).
2. Press **<kbd>Command + Shift + K</kbd>** (Mac) or **<kbd>Alt + J</kbd>** (Windows/Linux) to toggle the bar.
3. Type your question and hit **Enter**.
4. The response appears in a compact, few-lines card.
5. Click **Copy** to copy the answer, or press **<kbd>Esc</kbd>** to close the bar.

---

## Changing the Keyboard Shortcut

To customize your activation shortcut:
1. Go to `chrome://extensions/shortcuts` in Chrome.
2. Find **Floating AI Bar**.
3. Click the pencil icon next to **Toggle Floating AI Chat Bar** and press your desired key combination (e.g., `Cmd+Space` or `Alt+Space`).
