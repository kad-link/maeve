# Maeve - Your AI companion while surfing online

Maeve is a lightweight, minimal, draggable, and resizable AI chat bar that runs on **any website** in Google Chrome. It provides instant, concise answers (strictly 2–4 sentences) powered by **OpenAI GPT-OSS 120B** on **Groq** (`openai/gpt-oss-120b`).

All configurations and settings are **pre-loaded** via a single `.env` file — zero runtime customization or cluttered settings forms for the user.

---

## 1. Setup Groq API Key

Open the `.env` file in the root folder of this project and paste your Groq API key:

```env
# Groq API Key (Get a free key at: https://console.groq.com/keys)
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=openai/gpt-oss-120b
```

---

## 2. Install in Google Chrome

1. Clone or download this project folder to your computer.
2. Open Google Chrome and navigate to:
   ```text
   chrome://extensions/
   ```
3. Enable **Developer mode** using the toggle in the top-right corner.
4. Click the **Load unpacked** button in the top-left corner.
5. In the file picker, select the project directory (the folder containing `manifest.json`).
6. Maeve is now installed and active!

---

## 3. How to Use

- **Summon / Dismiss**: Press **<kbd>Command + Shift + K</kbd>** (macOS) or **<kbd>Alt + J</kbd>** (Windows / Linux) on any website.
- **Move**: Click and drag Maeve by the top header bar anywhere across your screen.
- **Resize**: Click and drag the bottom-right corner handle to resize the width or response height.
- **Close**: Press <kbd>Esc</kbd> or click the **✕** button.
- **Ask**: Type your question and press <kbd>Enter</kbd>. Maeve replies concisely in 2–4 lines.
- **Copy**: Click the **Copy** button to copy the answer to your clipboard.

---

## Customizing the Keyboard Shortcut

You can change the activation hotkey at any time:
1. Navigate to `chrome://extensions/shortcuts` in Chrome.
2. Locate **Maeve**.
3. Click the pencil icon next to **Toggle Maeve Chat Bar** and type your preferred key combination.
