// ── SITE CONFIG ───────────────────────────────────────────
const SITE_CONFIG = {
  "chatgpt.com": {
    input:   ["#prompt-textarea"],
    userMsg: [
      "[data-message-author-role='user'] .whitespace-pre-wrap",
      "[data-message-author-role='user'] p",
      "[data-message-author-role='user']"
    ]
  },
  "chat.openai.com": {
    input:   ["#prompt-textarea"],
    userMsg: [
      "[data-message-author-role='user'] .whitespace-pre-wrap",
      "[data-message-author-role='user'] p",
      "[data-message-author-role='user']"
    ]
  },
  "claude.ai": {
    input:   ["[contenteditable='true'].ProseMirror", "[contenteditable='true']"],
    userMsg: [
      '[data-testid="human-turn"] .whitespace-pre-wrap',
      '[data-testid="human-turn"] p',
      '[data-testid="human-turn"]',
      '.human-turn p',
      '[class*="HumanTurn"] p',
      '[class*="human-turn"] p'
    ]
  },
  "gemini.google.com": {
    input:   [".ql-editor", "rich-textarea .ql-editor"],
    userMsg: [
      "user-query .query-text",
      "user-query-content .query-text",
      ".user-query-text-line",
      ".user-query-text p",
      ".user-query-text"
    ]
  },
  "chat.deepseek.com": {
    input:   ["textarea#chat-input", "textarea"],
    userMsg: [
      ".d29f3d7d.ds-message",
      ".ds-message:not(:has(.ds-markdown))"
    ]
  },
  "aistudio.google.com": {
    input:   ["ms-prompt-input textarea", "textarea.query-input", "textarea"],
    userMsg: [
      ".chat-turn-container.user .turn-content"
    ]
  }
};

function getSiteKey() {
  return Object.keys(SITE_CONFIG).find(k => location.hostname.includes(k));
}

// ── GET INPUT ELEMENT ─────────────────────────────────────
function getInputEl(key) {
  for (const sel of SITE_CONFIG[key].input) {
    const el = document.querySelector(sel);
    if (el) return el;
  }
  return null;
}

// ── LIVE PROMPT CAPTURE ───────────────────────────────────
function capturePrompt(e) {
  if (e.key !== "Enter" || e.shiftKey) return;
  const key = getSiteKey();
  if (!key) return;
  const el = getInputEl(key);
  if (!el) return;
  const text = (el.value || el.innerText || "").trim();
  if (!text) return;
  chrome.runtime.sendMessage({
    type: "SAVE_PROMPT",
    payload: { text, source: location.hostname, time: new Date().toISOString(), from: "live" }
  });
}
document.addEventListener("keydown", capturePrompt, true);

// Perplexity submits via button click — capture on mousedown of submit button
document.addEventListener("click", (e) => {
  const key = getSiteKey();
  if (!key) return;
  const btn = e.target.closest("button[type='submit'], button[aria-label*='submit'], button[aria-label*='Search'], button[aria-label*='Ask']");
  if (!btn) return;
  const el = getInputEl(key);
  if (!el) return;
  const text = (el.value || el.innerText || "").trim();
  if (!text) return;
  chrome.runtime.sendMessage({
    type: "SAVE_PROMPT",
    payload: { text, source: location.hostname, time: new Date().toISOString(), from: "live" }
  });
}, true);

// ── GET CHAT TITLE ────────────────────────────────────────
const TITLE_SELECTORS = {
  "chatgpt.com":         ["nav [aria-current='page'] .overflow-hidden", "nav [data-active='true'] .overflow-hidden"],
  "chat.openai.com":     ["nav [aria-current='page'] .overflow-hidden"],
  "claude.ai":           ["[data-testid='chat-menu-item'][aria-selected='true'] .font-medium", "nav a.bg-bg-200 .font-medium"],
  "gemini.google.com":   [".conversation-title.selected", "[data-selected='true'] .conversation-title"],
  "chat.deepseek.com":   [
    ".chat-item.is-active .chat-title",
    ".chat-item.active .chat-title",
    "[class*='chatItem'][class*='active'] [class*='title']",
    "[class*='active'] [class*='chatTitle']",
    "[class*='active'] [class*='title']"
  ],
  "aistudio.google.com": [
    "[aria-selected='true'] .prompt-display-name",
    ".selected-prompt .prompt-display-name",
    ".selected-prompt .prompt-title",
    "[aria-selected='true'] .title",
    "[aria-current='page'] .title"
  ]
};

function getChatTitle() {
  const key = getSiteKey();
  if (key && TITLE_SELECTORS[key]) {
    for (const sel of TITLE_SELECTORS[key]) {
      try {
        const el = document.querySelector(sel);
        if (el) {
          const t = el.innerText?.trim();
          if (t && t.length > 1) return t;
        }
      } catch(e) {}
    }
  }
  let title = document.title || "";
  title = title
    .replace(/\s*[-–|]\s*(ChatGPT|Claude|Gemini|Google|DeepSeek|Perplexity|AI Studio).*/i, "")
    .replace(/^(ChatGPT|Claude|Gemini|DeepSeek|Perplexity)\s*[-–|]\s*/i, "")
    .trim();
  return title || "Untitled Chat";
}

// ── SCRAPE USER MESSAGES ──────────────────────────────────
function getUserMessages(key) {
  const seen = new Set();
  const results = [];

  const push = (el) => {
    const t = el.innerText?.trim();
    if (t && t.length > 2 && !seen.has(t)) {
      seen.add(t);
      results.push(t);
    }
  };

  // TIER 1: configured selectors
  for (const sel of SITE_CONFIG[key].userMsg) {
    try {
      const nodes = document.querySelectorAll(sel);
      if (nodes.length) {
        nodes.forEach(push);
        if (results.length) {
          // deduplicate: remove entries that are substrings of longer entries (parent containers)
          return results.filter((t, i) => !results.some((other, j) => i !== j && other.includes(t) && other.length > t.length));
        }
      }
    } catch(e) {}
  }

  // TIER 2: any element with data attribute = "user" or "human"
  const DATA_ATTRS = ["data-message-author-role","data-role","data-message-role","data-sender","data-type","data-testid"];
  document.querySelectorAll("*").forEach(el => {
    for (const attr of DATA_ATTRS) {
      const v = (el.getAttribute(attr) || "").toLowerCase();
      if (v === "user" || v === "human" || v === "user-message" || v === "human-turn") {
        push(el); break;
      }
    }
  });
  if (results.length) return results;

  // TIER 3: class name keywords
  const USER_KW = ["usermessage","user-message","user_message","humanmessage","human-message","userquery","user-query","humanturn","human-turn","requestcontainer","request-container","usertext","user-text","querybubble","query-bubble"];
  const BOT_KW  = ["assistant","botmessage","bot-message","aimessage","ai-message","modelmessage","model-message","responsecontent","response-content"];
  document.querySelectorAll("*").forEach(el => {
    const cls = (typeof el.className === "string" ? el.className : "").toLowerCase().replace(/\s+/g,"");
    if (USER_KW.some(k => cls.includes(k)) && !BOT_KW.some(k => cls.includes(k))) {
      push(el);
    }
  });
  if (results.length) return results;

  // TIER 4: role="row" or role="listitem" alternating pattern
  const FEED_SELS = ["[role='list'] > [role='listitem']","[role='feed'] > *",".messages > *",".chat-messages > *",".conversation-turns > *",".thread-messages > *"];
  for (const sel of FEED_SELS) {
    try {
      const items = Array.from(document.querySelectorAll(sel));
      if (items.length >= 2) {
        // user turns are typically even-indexed (0,2,4...)
        items.filter((_,i) => i % 2 === 0).forEach(push);
        if (results.length) return results;
      }
    } catch(e) {}
  }

  // TIER 5: aria-label containing "you" or "user said"
  document.querySelectorAll("[aria-label]").forEach(el => {
    const label = (el.getAttribute("aria-label") || "").toLowerCase();
    if (label.includes("you said") || label.includes("user message") || label.includes("your message")) {
      push(el);
    }
  });

  return results;
}

// ── AI STUDIO VIRTUAL SCROLL SCRAPER ─────────────────────
function scrapeAIStudioByScrolling(callback) {
  const scrollEl = document.querySelector("ms-autoscroll-container") || document.scrollingElement;
  if (!scrollEl) { callback([]); return; }

  const seen = new Set();
  const results = [];
  const originalScroll = scrollEl.scrollTop;

  function collectVisible() {
    document.querySelectorAll(".chat-turn-container.user").forEach(el => {
      const t = el.innerText?.replace(/^(edit|more_vert|\s)+/g, "").trim();
      if (t && t.length > 2 && !seen.has(t)) {
        seen.add(t);
        results.push(t);
      }
    });
  }

  // scroll to top first, then scroll down collecting text
  scrollEl.scrollTop = 0;
  let lastScrollTop = -1;
  let attempts = 0;

  function scrollStep() {
    collectVisible();
    if (scrollEl.scrollTop === lastScrollTop || attempts > 60) {
      // done — restore scroll position
      scrollEl.scrollTop = originalScroll;
      callback(results);
      return;
    }
    lastScrollTop = scrollEl.scrollTop;
    scrollEl.scrollTop += 600;
    attempts++;
    setTimeout(scrollStep, 300);
  }
  setTimeout(scrollStep, 400);
}

// ── SCRAPE CURRENT CHAT ───────────────────────────────────
function scrapeCurrentChat() {
  const key = getSiteKey();
  if (!key) return;

  if (key === "aistudio.google.com") {
    scrapeAIStudioByScrolling(prompts => {
      if (!prompts.length) return;
      chrome.runtime.sendMessage({
        type: "SAVE_HISTORY",
        payload: { source: location.hostname, url: location.href, chatTitle: getChatTitle(), prompts }
      });
    });
    return;
  }

  const prompts = getUserMessages(key);
  if (!prompts.length) return;
  chrome.runtime.sendMessage({
    type: "SAVE_HISTORY",
    payload: { source: location.hostname, url: location.href, chatTitle: getChatTitle(), prompts }
  });
}

// Auto-scrape on load with retry
function autoScrape(retries = 2) {
  const key = getSiteKey();
  if (!key) return;
  const prompts = getUserMessages(key);
  if (!prompts.length && retries > 0) {
    setTimeout(() => autoScrape(retries - 1), 3000);
    return;
  }
  if (prompts.length) scrapeCurrentChat();
}
setTimeout(autoScrape, 2500);

// Re-scrape on SPA navigation
let lastUrl = location.href;
const NAV_DELAY = {
  "aistudio.google.com": 5000,
  "gemini.google.com":   3000,
  "chat.deepseek.com":   4000
};
function getNavDelay() {
  const key = getSiteKey();
  return (key && NAV_DELAY[key]) || 2000;
}

const observer = new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    clearTimeout(window._scanTimer);
    window._scanTimer = setTimeout(scrapeCurrentChat, getNavDelay());
  }
});
observer.observe(document.body, { childList: true, subtree: true });

// ── LISTEN FOR POPUP SCAN REQUEST ─────────────────────────
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "SCAN_HISTORY") {
    const key = getSiteKey();
    if (!key) {
      sendResponse({ ok: false, reason: "Not an AI site. Open ChatGPT, Claude, Gemini, DeepSeek or AI Studio." });
      return true;
    }
    const chatTitle = getChatTitle();

    if (key === "aistudio.google.com") {
      scrapeAIStudioByScrolling(prompts => {
        if (!prompts.length) {
          sendResponse({ ok: false, reason: "No messages found. AI Studio virtual scroll found no user turns." });
          return;
        }
        chrome.runtime.sendMessage({
          type: "SAVE_HISTORY",
          payload: { source: location.hostname, url: location.href, chatTitle, prompts }
        });
        sendResponse({ ok: true, count: prompts.length, title: chatTitle });
      });
      return true;
    }

    const prompts = getUserMessages(key);
    if (!prompts.length) {
      sendResponse({ ok: false, reason: "No messages found." });
      return true;
    }
    chrome.runtime.sendMessage({
      type: "SAVE_HISTORY",
      payload: { source: location.hostname, url: location.href, chatTitle, prompts }
    });
    sendResponse({ ok: true, count: prompts.length, title: chatTitle });
    return true;
  }
});
