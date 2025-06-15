// MIT License
// Copyright (c) 2025 Yuta Watanabe

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ enabled: true });
  });
  