chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {

  if (message.type === "SCAN_PAGE") {

    const assignments = [];

    // Example selectors commonly used in Brightspace
    const links = document.querySelectorAll("a");

    links.forEach(link => {

      const text = link.textContent?.toLowerCase() || "";

      if (text.includes("assignment") || text.includes("quiz") || text.includes("project")) {

        assignments.push({
          title: link.textContent.trim(),
          url: link.href
        });

      }

    });

    sendResponse({
      page: document.title,
      assignments: assignments
    });

  }

});