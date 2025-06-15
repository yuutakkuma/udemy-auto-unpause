let enabled = true; // デフォルト

chrome.storage.sync.get("enabled", (data) => {
  enabled = data.enabled ?? true;
});

function tryClickUnpauseButton() {
  if (!enabled) return;

  const button = document.querySelector(
    'button[data-purpose="unpause-test"].ud-btn-primary'
  );

  if (button) {
    console.log("✅ 『テストを再開する』ボタンを検出。クリックします。");
    button.click();
  }
}

// メッセージを受け取って状態を更新
chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
  if (message.type === "SET_ENABLED") {
    enabled = message.enabled;
    console.log(`🔄 Auto Unpause 機能を ${enabled ? "有効化" : "無効化"} しました`);
  }
});

// DOM変化 + 定期チェック
const observer = new MutationObserver(() => {
  tryClickUnpauseButton();
});
observer.observe(document.body, { childList: true, subtree: true });

// setInterval(tryClickUnpauseButton, 1000); <- 現状はobserverで十分なのでコメントアウトする
