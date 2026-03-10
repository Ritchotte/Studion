const BACKEND_SCAN_URL = "http://localhost:3000/scan";

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type !== "SEND_SCAN_TO_BACKEND") {
    return undefined;
  }

  fetch(BACKEND_SCAN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(message.pageData)
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}`);
      }

      const data = await response.json();
      sendResponse({
        status: "ok",
        data
      });
    })
    .catch((error) => {
      sendResponse({
        status: "error",
        message: error instanceof Error ? error.message : "Unknown fetch error"
      });
    });

  return true;
});
