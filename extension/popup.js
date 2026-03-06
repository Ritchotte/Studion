document.getElementById("scanBtn").addEventListener("click", async () => {
  const output = document.getElementById("output");

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab?.id) {
    output.textContent = "No active tab found.";
    return;
  }

  chrome.tabs.sendMessage(tab.id, { type: "SCAN_PAGE" }, (response) => {
    if (chrome.runtime.lastError) {
      output.textContent = "Could not connect to page.";
      return;
    }

    output.textContent = JSON.stringify(response, null, 2);
  });
});