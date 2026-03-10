# Studion

![Node](https://img.shields.io/badge/node.js-green?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-blue?logo=typescript&logoColor=white)
![Chrome Extension](https://img.shields.io/badge/chrome-extension-orange?logo=googlechrome&logoColor=white)
![Express](https://img.shields.io/badge/express-black?logo=express&logoColor=white)

> Your academic operating system.

An AI-powered platform designed to help students manage assignments, deadlines, and study workflows automatically. Studion combines a Chrome extension with an intelligent backend to transform learning platforms like Brightspace into a personal academic assistant.

---

## Demo

**Studion Chrome Extension in Action**

The extension now auto-detects supported BCIT Learn pages on load, extracts structured page data, and sends that payload to the local Studion backend automatically.

**Example Output:**
```json
{
  "title": "Lesson 8 - COMP-2501-0 - Programming Fundamentals Part 2 (Java) - 88461",
  "url": "https://learn.bcit.ca/d2l/le/content/1193211/Home",
  "scannedAt": "2026-03-10T07:11:08.933Z",
  "pageType": "content-module",
  "courseTitle": "COMP-2501-0 - Programming Fundamentals Part 2 (Java) - 88461",
  "assignmentTitle": "Lesson 8",
  "dueDate": null,
  "description": null,
  "assignmentLinks": [
    {
      "title": "2501_Lab08",
      "url": "https://learn.bcit.ca/d2l/le/content/1193211/viewContent/12408277/View"
    }
  ]
}
```

**Backend Response:**
```
{
  "status": "scan received",
  "received": {
    "...": "structured page payload"
  }
}
```

---

## Why Studion Exists

University platforms provide information but rarely help students manage their workload.

Assignments, announcements, and deadlines are scattered across multiple systems. Students spend more time organizing their work than actually completing it—checking portals, manually updating calendars, estimating workloads, and trying to remember which assignments matter most.

**Studion is designed to act as an intelligent layer on top of existing learning platforms**, helping students stay organized and proactive without requiring manual tracking.

### The Core Problem

Students don't fail because they can't do the work—they fail because managing the work is overwhelming. Between juggling LMS portals, group chats, email threads, and shifting deadlines, the cognitive load of *organizing* school competes with actually learning.

**Studion handles the meta-work so students can focus on the actual work.**

---

## The Solution

A Chrome extension + AI agent system that:

1. **Automatically detects** supported LMS pages as they load
2. **Extracts structured course content** from your university portal (currently BCIT Learn / D2L Brightspace)
3. **Sends scan payloads** to a local backend for ingestion
4. **Intelligently analyzes** workload, priority, and complexity
5. **Generates actionable** study plans with realistic time estimates
6. **Keeps you ahead** with smart reminders and deadline tracking
7. **Creates structure** with auto-generated project hubs for major assignments

### Why a Chrome Extension?

Universities lock down LMS APIs—but students are already authenticated in their browsers. A Chrome extension reads the same data students can already see, no institutional approval needed. It's invisible infrastructure that just works.

---

## Future Vision

Studion is intended to evolve into a complete academic operating system—an intelligent autopilot for student life.

**Planned Capabilities:**

- 🎯 **Automated Assignment Detection** — Scan learning platforms automatically, no manual input
- 🤖 **AI-Driven Study Planning** — Generate realistic schedules based on workload and calendar gaps
- 🔔 **Smart Deadline Management** — Multi-channel reminders (browser, calendar, email, SMS)
- 📋 **Intelligent Task Breakdown** — Convert vague assignments into actionable step-by-step plans
- 🏗️ **Collaborative Project Hubs** — Auto-generate structured workspaces for group projects
- 🔗 **Platform Integrations** — Connect with Google Calendar, Notion, Slack, and messaging tools
- 📊 **Priority Intelligence** — Automatically identify high-impact assignments by weight and difficulty
- 🌐 **Multi-LMS Support** — Expand beyond Brightspace to Canvas, Moodle, and other platforms

**The Goal:** An AI agent that knows your courses, tracks your assignments, plans your study schedule, and keeps you ahead of deadlines—all running quietly in the background.

---

## Current Status

### What's Built (So Far)

### ✅ Backend Infrastructure
- Express.js API server with TypeScript
- Health monitoring endpoint
- Scan ingestion endpoint at `POST /scan`
- Local CORS handling for extension-to-backend communication
- Hot-reload development environment
- Clean project architecture ready for scaling

### ✅ Chrome Extension
- Manifest V3 extension targeting `https://learn.bcit.ca/*`
- Auto-scan on supported page load
- Background service worker for backend requests
- Popup fallback for manual scans
- Heuristic extraction of course title, assignment title, due date, description, and relevant links

### 🚧 Currently Building
- More reliable Brightspace-specific selectors
- Better assignment/detail page classification
- Storage and analysis layers beyond simple scan logging

---

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     D2L Brightspace                         │
│                  (University LMS Portal)                    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ DOM Parsing
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Chrome Extension (Data Layer)                  │
│  • Content script detects supported pages on load           │
│  • Structured JSON payload generation                       │
│  • Background worker posts scans to backend                 │
│  • Popup UI remains available as a manual fallback          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ POST /scan
                         ▼
┌─────────────────────────────────────────────────────────────┐
│            Backend API (Node.js + Express)                  │
│  • Scan ingestion and logging                               │
│  • Assignment ingestion & storage                           │
│  • AI agent orchestration                                   │
│  • Priority scoring algorithms                              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ Claude API
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  AI Agent System                            │
│  • Workload estimation (hours needed)                       │
│  • Task breakdown generation                                │
│  • Study schedule optimization                              │
│  • Project hub scaffolding                                  │
└─────────────────────────────────────────────────────────────┘
```

### Example Data Flow

**1. Student opens a BCIT Learn page**
```javascript
// Content script extracts:
{
  "courseTitle": "COMP-2501-0 - Programming Fundamentals Part 2 (Java) - 88461",
  "assignmentTitle": "Lesson 8",
  "pageType": "content-module",
  "assignmentLinks": [
    {
      "title": "2501_Lab08",
      "url": "https://learn.bcit.ca/d2l/le/content/1193211/viewContent/12408277/View"
    }
  ]
}
```

**2. Background worker sends the payload to the backend**
```
POST http://localhost:3000/scan
```

**3. Backend receives and logs the scan**
```
Studion received page scan:
{
  title: "Lesson 8 - COMP-2501-0 - Programming Fundamentals Part 2 (Java) - 88461",
  url: "https://learn.bcit.ca/d2l/le/content/1193211/Home",
  pageType: "content-module",
  courseTitle: "COMP-2501-0 - Programming Fundamentals Part 2 (Java) - 88461",
  assignmentTitle: "Lesson 8"
}
```

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Extension** | JavaScript, Chrome Extension Manifest V3 | Fast iteration, modern extension APIs |
| **Backend** | Node.js, Express, Prisma | Fast prototyping, strong ecosystem |
| **Database** | PostgreSQL | Relational data, robust querying |
| **AI/Agents** | Claude API (Anthropic) | Best-in-class reasoning for complex task planning |
| **Orchestration** | Custom agent framework | Tailored to student workflow needs |
| **Deployment** | Railway / Vercel | Simple, affordable, scalable |

---

## Roadmap

### Phase 1: MVP (Current)
- [x] Backend server infrastructure
- [x] Git repository & workflow
- [x] Chrome extension skeleton
- [x] BCIT Learn auto-scan on page load
- [x] Basic DOM extraction pipeline
- [x] Basic API endpoint (`POST /scan`)
- [ ] Brightspace-specific field extraction hardening

### Phase 2: Intelligence
- [ ] Claude AI integration
- [ ] Assignment analysis agent
- [ ] Task breakdown generation
- [ ] Workload estimation
- [ ] Priority scoring algorithm

### Phase 3: Automation
- [ ] Browser notification system
- [ ] Google Calendar integration
- [ ] Study schedule generator
- [ ] Multi-day assignment tracking

### Phase 4: Scale
- [ ] Project hub auto-generation (Notion API)
- [ ] Multi-LMS support (Canvas, Moodle)
- [ ] Email/SMS notifications
- [ ] Chrome Web Store deployment

---

## Why This Project Matters

**Personally:**  
I built this because I was drowning in my own school logistics at BCIT. Assignments scattered across portals, no central view, constant stress about "what am I forgetting?" This is the tool I wish existed when I started.

**Technically:**  
This demonstrates full-stack product development—browser extension engineering, backend architecture, AI agent orchestration, database design, and product thinking. It's not a tutorial project; it's a real solution to a real problem.

**Impact:**  
If even 50 students save 2 hours a week on school logistics, that's 100 hours freed up for actual learning, side projects, or just... rest. Multiply that across thousands of students. That's meaningful.

---

## Competitive Landscape

| Tool | Approach | Limitation |
|------|----------|------------|
| MyStudyLife | Manual calendar input | Requires constant upkeep |
| Notion | DIY templates | Zero automation |
| Google Calendar | Generic reminders | No context awareness |
| Canvas/Brightspace | Basic notifications | Passive, not intelligent |
| **Studion** | **Automated extraction + AI planning** | **Active, intelligent, zero input** |

---

## Installation (Coming Soon)

Once the Chrome extension is live:

1. Download from Chrome Web Store
2. Visit your D2L Brightspace portal
3. Extension auto-detects assignments
4. AI generates your first study plan

No setup, no configuration, no friction.

---

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Git
- Chrome browser (for extension development)

### Quick Start

**1. Clone the repository**
```bash
git clone https://github.com/Ritchotte/Studion.git
cd Studion
```

**2. Set up the backend**
```bash
cd backend
npm install
npm run dev
```
The server will start at `http://localhost:3000`

**3. Verify the backend is running**
```bash
curl http://localhost:3000/health
# Expected: {"status":"Studion backend running"}
```

**4. Load the Chrome extension** *(coming soon)*
```bash
cd ../extension
npm install
npm run build
```
Then:
1. Open Chrome and navigate to `chrome://extensions`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `extension` folder

---

## Project Structure

```
Studion/
├── backend/              # Node.js API server
│   ├── src/
│   │   └── server.ts     # Express app entry point
│   ├── package.json
│   └── tsconfig.json
│
├── extension/            # Chrome extension (in progress)
│   ├── manifest.json
│   ├── src/
│   │   ├── content.ts    # DOM scraping logic
│   │   ├── background.ts # Event handling
│   │   └── popup/        # UI components
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Built By

**Ruth Ritchotte**  
Computer Systems Technology Student @ BCIT  
White Rock, BC

**Contact:**  
- GitHub: [@Ritchotte](https://github.com/Ritchotte)
- Email: Ruthannaritchotte@gmail.com

---

## License

MIT License - feel free to fork and adapt for your own university!

---

**Status Update:** Foundation complete. Chrome extension in active development. First working demo targeted for late March 2026.

*Last updated: March 6, 2026*
