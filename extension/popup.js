const SUPPORTED_HOST = "learn.bcit.ca";

function isSupportedPage(url) {
  if (!url) {
    return false;
  }

  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && parsed.hostname === SUPPORTED_HOST;
  } catch {
    return false;
  }
}

document.getElementById("scanBtn").addEventListener("click", async () => {
  const output = document.getElementById("output");
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab?.id) {
    output.textContent = "No active tab found.";
    return;
  }

  if (!isSupportedPage(tab.url)) {
    output.textContent = "Open a page on https://learn.bcit.ca/ and try again.";
    return;
  }

  chrome.tabs.sendMessage(tab.id, { type: "SCAN_PAGE" }, (response) => {
    if (chrome.runtime.lastError) {
      output.textContent =
        "Scan failed: " +
        chrome.runtime.lastError.message +
        ". Refresh the BCIT Learn tab and try again.";
      return;
    }

    output.textContent = JSON.stringify(response, null, 2);
  });
});
