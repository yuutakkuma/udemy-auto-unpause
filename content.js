const AUTO_CLICK_INTERVAL = 1000; // ms

function tryClickUnpauseButton() {
  const button = document.querySelector(
    'button[data-purpose="unpause-test"].ud-btn-primary'
  );

  if (button) {
    console.log("✅ 『テストを再開する』ボタンを検出。クリックします。");
    button.click();
  }
}

const observer = new MutationObserver(() => {
  tryClickUnpauseButton();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// 念のため定期実行でも対応
setInterval(tryClickUnpauseButton, AUTO_CLICK_INTERVAL);
