// MIT License
// Copyright (c) 2025 Yuta Watanabe

const toggle = document.getElementById("toggle");

chrome.storage.sync.get("enabled", (data) => {
  toggle.checked = data.enabled ?? true;
});

toggle.addEventListener("change", () => {
  const enabled = toggle.checked;
  chrome.storage.sync.set({ enabled });

  // 現在のタブに状態を送信
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, { type: "SET_ENABLED", enabled });
    }
  });
});
