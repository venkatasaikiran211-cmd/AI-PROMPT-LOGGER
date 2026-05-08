chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

  if (msg.type === "SAVE_PROMPT") {
    chrome.storage.local.get({ prompts: [] }, ({ prompts }) => {
      prompts.push(msg.payload);
      chrome.storage.local.set({ prompts });
    });
  }

  if (msg.type === "SAVE_HISTORY") {
    const { source, url, chatTitle, prompts } = msg.payload;
    if (!prompts || !prompts.length) return;

    // Build a stable key from the URL path (e.g. /c/abc123)
    let urlPath = "";
    try { urlPath = new URL(url).pathname; } catch(e) { urlPath = url || ""; }
    const urlKey = urlPath.replace(/[^a-z0-9]/gi, "_").replace(/_+/g, "_").slice(0, 60) || ("ts_" + Date.now());
    const storageKey = "chat_" + urlKey;

    chrome.storage.local.set({
      [storageKey]: {
        source,
        url,
        chatTitle: chatTitle || "Untitled Chat",
        prompts,
        scannedAt: new Date().toISOString()
      }
    });
  }

});
