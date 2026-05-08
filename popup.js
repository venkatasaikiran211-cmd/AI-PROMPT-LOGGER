const PLATFORM_NAMES = {
  "chatgpt.com":         "ChatGPT",
  "chat.openai.com":     "ChatGPT",
  "claude.ai":           "Claude",
  "gemini.google.com":   "Gemini",
  "chat.deepseek.com":   "DeepSeek",
  "aistudio.google.com": "AI Studio"
};

function getPlatformName(src) {
  const k = Object.keys(PLATFORM_NAMES).find(k => src.includes(k));
  return k ? PLATFORM_NAMES[k] : src.replace(/\..+/, "");
}
function getInitials(n) { return n.slice(0, 2).toUpperCase(); }

const LOGOS = {
  ChatGPT: `<svg width="18" height="18" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" style="color:#000"><path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.212-2.318 10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.212 2.318 10.079 10.079 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.242-11.814zm-17.297 24.12a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.601zm-16.124-6.908a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zm-2.09-17.496a7.47 7.47 0 0 1 3.908-3.285c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.012L8.048 25.444a7.504 7.504 0 0 1-5.027-8.858zm27.688 6.447-9.724-5.615 3.367-1.943a.121.121 0 0 1 .114-.012l8.048 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.647-1.13zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943 4.33-2.501 4.332 2.497v4.998l-4.331 2.5-4.331-2.5V21z" fill="currentColor"/></svg>`,
  Claude:  `<svg width="18" height="18" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.93 4C12.46 4 4 12.46 4 22.93c0 10.47 8.46 18.93 18.93 18.93 10.47 0 18.93-8.46 18.93-18.93C41.86 12.46 33.4 4 22.93 4zm0 5.5c2.56 0 4.97.68 7.05 1.87l-14.6 14.6a13.37 13.37 0 0 1-1.87-7.05c0-5.18 2.94-9.68 7.24-11.97a13.3 13.3 0 0 1 2.18-.45zm0 26.86c-2.56 0-4.97-.68-7.05-1.87l14.6-14.6c1.19 2.08 1.87 4.49 1.87 7.05 0 5.18-2.94 9.68-7.24 11.97a13.3 13.3 0 0 1-2.18.45z" fill="#D97757"/></svg>`,
  Gemini:  `<svg width="18" height="18" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 28C14 26.0633 13.6267 24.2433 12.88 22.54C12.1567 20.8367 11.165 19.355 9.905 18.095C8.645 16.835 7.16333 15.8433 5.46 15.12C3.75667 14.3733 1.93667 14 0 14C1.93667 14 3.75667 13.6383 5.46 12.915C7.16333 12.1683 8.645 11.165 9.905 9.905C11.165 8.645 12.1567 7.16333 12.88 5.46C13.6267 3.75667 14 1.93667 14 0C14 1.93667 14.3617 3.75667 15.085 5.46C15.8317 7.16333 16.835 8.645 18.095 9.905C19.355 11.165 20.8367 12.1683 22.54 12.915C24.2433 13.6383 26.0633 14 28 14C26.0633 14 24.2433 14.3733 22.54 15.12C20.8367 15.8433 19.355 16.835 18.095 18.095C16.835 19.355 15.8317 20.8367 15.085 22.54C14.3617 24.2433 14 26.0633 14 28Z" fill="url(#gemini_grad)"/><defs><linearGradient id="gemini_grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#4285F4"/><stop offset="50%" stop-color="#9B72CB"/><stop offset="100%" stop-color="#D96570"/></linearGradient></defs></svg>`,
  DeepSeek: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#4D6BFE"/><path d="M7 12.5c0-2.485 2.015-4.5 4.5-4.5S16 10.015 16 12.5 13.985 17 11.5 17 7 14.985 7 12.5z" fill="white"/><circle cx="11.5" cy="12.5" r="2" fill="#4D6BFE"/><path d="M14.5 8.5c.828 0 1.5-.672 1.5-1.5S15.328 5.5 14.5 5.5 13 6.172 13 7s.672 1.5 1.5 1.5z" fill="white"/></svg>`,
  "AI Studio": `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="url(#aistudio_grad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="aistudio_grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#4285F4"/><stop offset="100%" stop-color="#34A853"/></linearGradient></defs></svg>`
};

function getLogo(name) {
  return LOGOS[name] || `<span style="font-size:11px;font-weight:800;">${name.slice(0,2).toUpperCase()}</span>`;
}
function getSlug(n)     { return n.toLowerCase().replace(/\s+/g, "_"); }
function getDate()      { return new Date().toISOString().slice(0, 10); }
function safeSlug(s)    { return s.toLowerCase().replace(/[^a-z0-9]+/g, "_").slice(0, 40); }

// ── TAB NAVIGATION ────────────────────────────────────────
function switchTab(tabName) {
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".tab-page").forEach(p => p.classList.remove("active"));
  const btn = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
  const page = document.getElementById("tab-" + tabName);
  if (btn) btn.classList.add("active");
  if (page) page.classList.add("active");
}

document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => switchTab(btn.dataset.tab));
});

// restore tab after reload
const savedTab = sessionStorage.getItem("activeTab");
if (savedTab) {
  sessionStorage.removeItem("activeTab");
  switchTab(savedTab);
}

// ── LOAD DATA ─────────────────────────────────────────────
chrome.storage.local.get(null, (allData) => {
  const prompts = allData.prompts || [];
  const date    = getDate();
  const total   = prompts.length;

  // group live prompts by source
  const grouped = {};
  prompts.forEach(p => {
    grouped[p.source] = grouped[p.source] || [];
    grouped[p.source].push(p);
  });

  // collect all per-chat history entries
  const chatEntries = Object.entries(allData)
    .filter(([k]) => k.startsWith("chat_"))
    .map(([, v]) => v);

  // group chats by source
  const chatsBySource = {};
  chatEntries.forEach(c => {
    chatsBySource[c.source] = chatsBySource[c.source] || [];
    chatsBySource[c.source].push(c);
  });

  const allSources = new Set([...Object.keys(grouped), ...Object.keys(chatsBySource)]);
  const sites = allSources.size;

  document.getElementById("badge").textContent =
    total === 0 ? "No prompts yet" : `${total} prompt${total > 1 ? "s" : ""} logged`;
  document.getElementById("totalCount").textContent = total;
  document.getElementById("siteCount").textContent  = sites;

  // ── TAB: LIVE CHAT ────────────────────────────────────────
  const platformList = document.getElementById("platformList");
  if (!Object.keys(grouped).length) {
    platformList.innerHTML = `<div class="empty-state">No live prompts yet.<br>Start typing in an AI tool!</div>`;
  } else {
    Object.entries(grouped).sort((a, b) => b[1].length - a[1].length).forEach(([source, items]) => {
      const name = getPlatformName(source);
      const pct  = Math.round((items.length / total) * 100);
      const card = document.createElement("div");
      card.className = "platform-card glass";
      card.innerHTML = `
        <div class="platform-top">
          <div class="platform-left">
            <div class="platform-icon">${getLogo(name)}</div>
            <div>
              <div class="platform-name">${name}</div>
              <div class="platform-host">${source}</div>
            </div>
          </div>
          <span class="platform-count">${items.length} prompt${items.length > 1 ? "s" : ""}</span>
        </div>
        <div class="progress-bg"><div class="progress-fill" style="width:${pct}%;"></div></div>
        <div class="platform-footer">${pct}% of total &nbsp;&#128065; Click to view</div>
      `;
      card.addEventListener("click", () => openModal(name, items));
      platformList.appendChild(card);
    });
  }

  // ── TAB: HISTORY ──────────────────────────────────────────
  const historyList = document.getElementById("historyList");
  if (!chatEntries.length) {
    historyList.innerHTML = `<div class="empty-state">No history chats yet.<br>Click "Scan Current Chat" while viewing a history tab.</div>`;
  } else {
    // group by source
    allSources.forEach(source => {
      const chats = (chatsBySource[source] || []).sort((a, b) => new Date(b.scannedAt) - new Date(a.scannedAt));
      if (!chats.length) return;

      const name = getPlatformName(source);
      const groupLabel = document.createElement("div");
      groupLabel.className = "platform-group-label";
      groupLabel.innerHTML = `
        <div class="platform-group-icon">${getLogo(name)}</div>
        <div class="platform-group-name">${name} (${chats.length} chat${chats.length > 1 ? "s" : ""})</div>
      `;
      historyList.appendChild(groupLabel);

      chats.forEach((chat, i) => {
        const titleSlug  = safeSlug(chat.chatTitle);
        const scannedDate = chat.scannedAt ? chat.scannedAt.slice(0, 10) : date;
        const btnIdTxt   = `cht_txt_${getSlug(name)}_${i}`;
        const btnIdJson  = `cht_json_${getSlug(name)}_${i}`;
        const btnIdDel   = `cht_del_${getSlug(name)}_${i}`;

        // find the storage key for this chat by matching url
        const storageKey = Object.keys(allData).find(k => k.startsWith("chat_") && allData[k].url === chat.url);

        const card = document.createElement("div");
        card.className = "chat-card glass";
        card.innerHTML = `
          <div class="chat-card-top">
            <div class="chat-card-left">
              <div class="chat-card-icon">&#128172;</div>
              <div class="chat-card-info">
                <div class="chat-card-title" title="${chat.chatTitle}">${chat.chatTitle}</div>
                <div class="chat-card-meta">Scanned: ${scannedDate}</div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:6px;">
              <span class="chat-card-count">${chat.prompts.length}</span>
              <button class="chat-del-btn" id="${btnIdDel}" title="Delete this chat">&#10005;</button>
            </div>
          </div>
          <div class="chat-dl-row">
            <button class="chat-dl-btn" id="${btnIdTxt}">&#11015; ${titleSlug}.txt</button>
            <button class="chat-dl-btn" id="${btnIdJson}">&#11015; ${titleSlug}.json</button>
          </div>
        `;
        historyList.appendChild(card);

        card.querySelector(`#${btnIdTxt}`).onclick = () => {
          const sep = "-".repeat(50);
          const content = `Chat: ${chat.chatTitle}\nURL: ${chat.url}\nScanned: ${chat.scannedAt}\n\n` +
            chat.prompts.map((p, j) => `[Prompt #${j + 1}]\n${p}\n${sep}`).join("\n\n");
          download(`${titleSlug}_${scannedDate}.txt`, content, "text/plain;charset=utf-8");
        };
        card.querySelector(`#${btnIdJson}`).onclick = () => {
          download(`${titleSlug}_${scannedDate}.json`, JSON.stringify(chat, null, 2), "application/json");
        };
        card.querySelector(`#${btnIdDel}`).onclick = (e) => {
          e.stopPropagation();
          if (storageKey) {
            chrome.storage.local.remove(storageKey, () => {
              card.style.transition = "opacity 0.2s";
              card.style.opacity = "0";
              setTimeout(() => card.remove(), 220);
            });
          }
        };
      });
    });
  }

  // ── TAB: DOWNLOAD ─────────────────────────────────────────
  const dlContainer = document.getElementById("perPlatformDownload");
  if (allSources.size === 0) {
    dlContainer.innerHTML = `<div class="empty-state">No data yet.</div>`;
  } else {
    allSources.forEach(source => {
      const name      = getPlatformName(source);
      const slug      = getSlug(name);
      const liveItems = grouped[source] || [];
      const chats     = chatsBySource[source] || [];

      const block = document.createElement("div");
      block.className = "pdl-block glass";
      block.innerHTML = `
        <div class="pdl-header">
          <div class="pdl-icon">${getLogo(name)}</div>
          <div class="pdl-name">${name}</div>
        </div>
      `;

      // live prompts
      if (liveItems.length) {
        const liveSection = document.createElement("div");
        liveSection.innerHTML = `
          <div class="pdl-row-label">Live Prompts (${liveItems.length})</div>
          <div class="pdl-row">
            <button class="pdl-btn" id="live_txt_${slug}">&#11015; ${slug}_live_${date}.txt</button>
            <button class="pdl-btn" id="live_json_${slug}">&#11015; ${slug}_live_${date}.json</button>
          </div>
        `;
        block.appendChild(liveSection);

        block.querySelector(`#live_txt_${slug}`).onclick = () => {
          const sep = "-".repeat(50);
          const content = liveItems.map(p => `[${p.time}] (${p.source})\n${p.text}\n${sep}`).join("\n\n");
          download(`${slug}_live_${date}.txt`, content, "text/plain;charset=utf-8");
        };
        block.querySelector(`#live_json_${slug}`).onclick = () => {
          download(`${slug}_live_${date}.json`, JSON.stringify(liveItems, null, 2), "application/json");
        };
      }

      // history chats
      if (chats.length) {
        const histSection = document.createElement("div");
        histSection.innerHTML = `
          ${liveItems.length ? '<hr class="pdl-divider">' : ""}
          <div class="pdl-row-label">History Chats (${chats.length})</div>
          <div class="pdl-row">
            <button class="pdl-btn" id="hist_txt_${slug}">&#11015; ${slug}_history_${date}.txt</button>
            <button class="pdl-btn" id="hist_json_${slug}">&#11015; ${slug}_history_${date}.json</button>
          </div>
        `;
        block.appendChild(histSection);

        block.querySelector(`#hist_txt_${slug}`).onclick = () => {
          const sep = "-".repeat(50);
          const content = chats.map((c, i) =>
            `[Chat #${i + 1}] ${c.chatTitle}\nURL: ${c.url}\n\n` +
            c.prompts.map((p, j) => `[Prompt #${j + 1}]\n${p}\n${sep}`).join("\n\n")
          ).join("\n\n\n");
          download(`${slug}_history_${date}.txt`, content, "text/plain;charset=utf-8");
        };
        block.querySelector(`#hist_json_${slug}`).onclick = () => {
          download(`${slug}_history_${date}.json`, JSON.stringify(chats, null, 2), "application/json");
        };
      }

      if (!liveItems.length && !chats.length) {
        block.innerHTML += `<div class="empty-state" style="padding:8px 0;">No prompts yet.</div>`;
      }

      dlContainer.appendChild(block);
    });
  }

  // ── SCAN BUTTON ───────────────────────────────────────────
  document.getElementById("scanHistory").onclick = () => {
    const status = document.getElementById("scanStatus");
    status.textContent = "Scanning...";
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0]) { status.textContent = "No active tab found."; return; }
      chrome.tabs.sendMessage(tabs[0].id, { type: "SCAN_HISTORY" }, (resp) => {
        if (chrome.runtime.lastError) {
          status.textContent = "❌ Reload the AI page (Ctrl+Shift+R) then try again.";
          return;
        }
        if (!resp || !resp.ok) {
          status.textContent = `❌ ${resp ? resp.reason : "No response"}`;
          return;
        }
        status.textContent = `✓ Found ${resp.count} prompts in "${resp.title}". Loading...`;
        setTimeout(() => {
          sessionStorage.setItem("activeTab", "history");
          location.reload();
        }, 1800);
      });
    });
  };

  // ── DOWNLOAD ALL ──────────────────────────────────────────
  document.getElementById("downloadTxt").onclick = () => {
    const sep = "-".repeat(50);
    const content = prompts.map(p => `[${p.time}] (${p.source})\n${p.text}\n${sep}`).join("\n\n");
    download(`all_ai_prompts_${date}.txt`, content, "text/plain;charset=utf-8");
  };
  document.getElementById("downloadJson").onclick = () => {
    download(`all_ai_prompts_${date}.json`, JSON.stringify(prompts, null, 2), "application/json");
  };

  // ── SETTINGS: CLEAR BUTTONS ───────────────────────────────
  document.getElementById("clearLive").onclick = () => {
    if (confirm("Clear all live prompts?")) {
      chrome.storage.local.set({ prompts: [] }, () => location.reload());
    }
  };
  document.getElementById("clearHistory").onclick = () => {
    if (confirm("Clear all history chats?")) {
      const keys = Object.keys(allData).filter(k => k.startsWith("chat_"));
      keys.forEach(k => chrome.storage.local.remove(k));
      setTimeout(() => location.reload(), 200);
    }
  };
  document.getElementById("clearAll").onclick = () => {
    if (confirm("Clear EVERYTHING (live + history)?")) {
      chrome.storage.local.clear(() => location.reload());
    }
  };
});

// ── MODAL ─────────────────────────────────────────────────
function openModal(name, items) {
  document.getElementById("modalTitle").textContent = `${name} — ${items.length} prompt(s)`;
  document.getElementById("modalBody").innerHTML = [...items].reverse().map(p => `
    <div class="prompt-item">
      <div class="prompt-time">${new Date(p.time).toLocaleString()}</div>
      <div class="prompt-text">${escHtml(p.text)}</div>
    </div>
  `).join("");
  document.getElementById("modalOverlay").classList.add("open");
}

document.getElementById("modalClose").onclick = () =>
  document.getElementById("modalOverlay").classList.remove("open");
document.getElementById("modalOverlay").onclick = (e) => {
  if (e.target === document.getElementById("modalOverlay"))
    document.getElementById("modalOverlay").classList.remove("open");
};

function escHtml(s) {
  return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
function download(filename, content, type) {
  const blob = new Blob(["\uFEFF" + content], { type });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}
