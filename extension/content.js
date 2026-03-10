const AUTO_SCAN_KEY = "studion:auto-scan:last-url";

function normalizeText(value) {
  return value ? value.replace(/\s+/g, " ").trim() : "";
}

function getTextContent(selectorList) {
  for (const selector of selectorList) {
    const element = document.querySelector(selector);
    const text = normalizeText(element?.textContent || "");

    if (text) {
      return text;
    }
  }

  return null;
}

function getMetaContent(name) {
  const element = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
  return normalizeText(element?.getAttribute("content") || "");
}

function classifyPage() {
  const title = normalizeText(document.title).toLowerCase();
  const path = window.location.pathname.toLowerCase();

  if (path.includes("/content/")) {
    return "content-module";
  }

  if (path.includes("/quizzing/")) {
    return "quiz";
  }

  if (path.includes("/dropbox/")) {
    return "assignment";
  }

  if (path.includes("/discussion/")) {
    return "discussion";
  }

  if (path.includes("/grades/")) {
    return "grades";
  }

  if (/assignment|quiz|content|discussion|grades|lesson|module|lab/.test(title)) {
    return "course-content";
  }

  return "page";
}

function extractCourseTitle() {
  const directMatch = getTextContent([
    '[data-testid="course-name"]',
    ".d2l-navigation-s-course-title",
    ".course-name",
    ".navbar .title",
    "d2l-navigation-main-header h1"
  ]);

  if (directMatch) {
    return directMatch;
  }

  const breadcrumbLinks = Array.from(document.querySelectorAll("nav a, .breadcrumbs a"))
    .map((link) => normalizeText(link.textContent || ""))
    .filter(Boolean);

  return breadcrumbLinks.at(-1) || null;
}

function extractAssignmentTitle() {
  return getTextContent([
    "h1",
    "main h2",
    '[role="main"] h1',
    ".d2l-page-header h1",
    ".d2l-page-title"
  ]);
}

function extractDueDate() {
  const labelPattern = /(due date|due|end date|deadline|available until)/i;
  const datePattern = /\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\.?\s+\d{1,2}(?:,\s+\d{4})?(?:\s+at\s+\d{1,2}:\d{2}\s*(?:am|pm)?)?/i;

  const candidates = Array.from(
    document.querySelectorAll("dt, th, label, strong, b, .label-text, .d2l-property-name")
  );

  for (const candidate of candidates) {
    const label = normalizeText(candidate.textContent || "");

    if (!labelPattern.test(label)) {
      continue;
    }

    const siblingText = normalizeText(
      candidate.nextElementSibling?.textContent ||
      candidate.parentElement?.textContent ||
      ""
    );

    if (siblingText) {
      return siblingText;
    }
  }

  const bodyText = normalizeText(document.body.innerText || "");
  const matchedDate = bodyText.match(datePattern);
  return matchedDate ? matchedDate[0] : null;
}

function extractDescription() {
  const directMatch = getTextContent([
    '[data-testid="assignment-description"]',
    ".assignment-description",
    ".d2l-htmlblock-untrusted",
    '[role="main"] article',
    "main article",
    ".d2l-le-contents"
  ]);

  if (directMatch) {
    return directMatch.slice(0, 1000);
  }

  const paragraphs = Array.from(document.querySelectorAll("main p, article p, [role='main'] p"))
    .map((paragraph) => normalizeText(paragraph.textContent || ""))
    .filter((text) => text.length > 40);

  return paragraphs.slice(0, 3).join("\n\n").slice(0, 1000) || null;
}

function extractAssignmentLinks() {
  return Array.from(document.querySelectorAll("a[href]"))
    .map((link) => ({
      title: normalizeText(link.textContent || ""),
      url: link.href
    }))
    .filter((link) => {
      if (!link.title || !link.url) {
        return false;
      }

      if (!/^https?:\/\//i.test(link.url)) {
        return false;
      }

      return /(assignment|quiz|project|lab|discussion|exam|due|lesson|module)/i.test(link.title);
    })
    .slice(0, 10);
}

function collectPageData() {
  return {
    title: normalizeText(document.title),
    url: window.location.href,
    scannedAt: new Date().toISOString(),
    pageType: classifyPage(),
    courseTitle: extractCourseTitle(),
    assignmentTitle: extractAssignmentTitle(),
    dueDate: extractDueDate(),
    description: extractDescription(),
    assignmentLinks: extractAssignmentLinks(),
    metaDescription: getMetaContent("description") || null
  };
}

async function scanCurrentPage() {
  const pageData = collectPageData();
  const backendResponse = await chrome.runtime.sendMessage({
    type: "SEND_SCAN_TO_BACKEND",
    pageData
  });

  if (backendResponse?.status === "error") {
    throw new Error(backendResponse.message || "Unknown backend error");
  }

  return {
    status: "sent to backend",
    pageData,
    backendResponse
  };
}

async function autoScanPage() {
  if (sessionStorage.getItem(AUTO_SCAN_KEY) === window.location.href) {
    return;
  }

  try {
    const result = await scanCurrentPage();
    sessionStorage.setItem(AUTO_SCAN_KEY, window.location.href);
    console.log("Studion auto-scan complete:", result);
  } catch (error) {
    console.error("Studion auto-scan failed:", error);
  }
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type !== "SCAN_PAGE") {
    return undefined;
  }

  scanCurrentPage()
    .then((result) => {
      sendResponse(result);
    })
    .catch((error) => {
      sendResponse({
        status: "error",
        message: error instanceof Error ? error.message : "Unknown scan error"
      });
    });

  return true;
});

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", autoScanPage, { once: true });
} else {
  autoScanPage();
}
