chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "SCAN_PAGE") {
    const pageTitle = document.title;

    // placeholder scan for now
    const data = {
      title: pageTitle,
      url: window.location.href,
      message: "Studion scanned this page successfully."
    };

    sendResponse(data);
  }
});