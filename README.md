# 🏆 FIFA World Cup 2026 Master Tracker: Logic Engine & UI

![Status](https://img.shields.io/badge/Status-Production_Ready-brightgreen)
![Tech Stack](https://img.shields.io/badge/Stack-Vanilla_JS_%7C_HTML5_%7C_CSS3-blue)
![Deployment](https://img.shields.io/badge/Deployment-Netlify_Automated-orange)

## 📌 The Elevator Pitch
A dynamic, offline-first FIFA World Cup 2026 tournament tracker featuring a custom mathematical routing engine, automated group sorting, and a dual-timezone UI parser. 

This project was built without heavy front-end frameworks (no React, no Vue) to demonstrate a fundamental, ground-up understanding of DOM manipulation, data state management, and complex algorithmic routing in plain JavaScript.

## 🚀 Why I Built This (The Business Case)
As a professional transitioning from **Operations, Supply Chain, and Financial Analysis** into **Data Analytics**, I built this application to prove my technical capabilities in data architecture, algorithm design, and state management. 

In supply chain and finance, clean data and strict business rules are the foundation of operations. I built this tracker to demonstrate how I apply that operational mindset to software and data engineering. It specifically showcases my ability to:
1. **Translate Business Logic to Code:** Convert static, complex real-world rules (FIFA regulations) into dynamic, executable algorithms.
2. **Resolve Edge-Case Collisions:** Architect data lookup structures that eliminate mathematical routing errors without manual intervention.
3. **Manage Data State:** Build a robust, offline-first local memory pipeline that protects user inputs.

## 🧠 Core Architecture & Logic Engines

### 1. The Group Stage Harvester & Sorter
The engine listens for user inputs across all 72 group stage matches. It calculates Wins, Draws, Losses, Goals For, Goals Against, and Goal Difference on the fly. A custom sorting algorithm applies the official FIFA tie-breaker rules (`Points > GD > GF`) and dynamically ranks the 12 group tables in real-time without overwriting DOM assets.

### 2. The 3rd-Place Gatekeeper & 495-Scenario Matrix
The most mathematically complex rule in the 2026 format is routing the 8 advancing 3rd-place teams. 
* **The Problem:** A greedy Depth-First Search (DFS) algorithm will misallocate teams because multiple groups satisfy the same bracket slots, causing illegal collisions.
* **The Solution:** I engineered a strict **Dictionary Lookup Architecture**. The engine waits until all 144 group stage appearances are logged (the Gatekeeper). It then extracts the advancing teams, sorts them alphabetically, and hits a hardcoded lookup table mapping to FIFA's exact 495-scenario matrix. It is mathematically impossible for the routing to fail.

### 3. The Dual-Timezone Parser
Relying on native browser `toLocaleTimeString` methods causes UI failures when system-level locale settings override the application. To fix this, I abandoned native string formatting and built a custom mathematical parser that extracts raw hours/minutes from UTC strings, forcing the UI to render reliable 12-hour/24-hour dual displays regardless of the user's OS settings.

### 4. The Local Memory Core
The application is "offline-first." A custom `localStorage` pipeline captures keystrokes via structural `data-match-id` keys (rather than fragile DOM indexes) and saves the offline state instantly. A double-confirmation "Nuke Reset" kill switch is implemented to protect against accidental data wiping of 104 matches.

### 5. Automated Champion Crowning
The UI is strictly locked against manual frontend tampering. Once the final whistle blows in Match 104, the backend logic engine evaluates the score, extracts the winning nation, automatically injects it into the Champion slot, and permanently saves the state.

## 👨‍💻 The Team

* **Pedrus Niloy Rozario** — *Lead Data Architect & Developer*
  * Designed the data pipeline, built the core mathematical logic, and managed the deployment architecture.
* **Kevin (Google Gemini)** — *AI Engineering Partner*
  * Consulted on JavaScript edge-case patching, dictionary lookup optimization, and DOM state immunization. 

## 🔗 Live Deployment
This application is integrated with GitHub and auto-deploys via Netlify. 
https://fifascorechart.netlify.app/
