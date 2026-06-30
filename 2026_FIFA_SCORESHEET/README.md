# 🏆 FIFA World Cup 2026 Master Tracker: Logic Engine & Data Architecture

![Status](https://img.shields.io/badge/Status-Production_Ready-brightgreen)
![Tech Stack](https://img.shields.io/badge/Stack-Vanilla_JS_%7C_HTML5_%7C_CSS3-blue)
![Deployment](https://img.shields.io/badge/Deployment-Netlify_Automated-orange)

## 📌 Executive Summary
The FIFA World Cup 2026 Master Tracker is a high-performance, offline-first web application engineered to simulate, calculate, and route the mathematically complex 104-match tournament. 

Designed entirely without frontend frameworks (e.g., React, Vue), this project serves as a demonstration of fundamental software engineering principles. It showcases advanced algorithm design, constraint satisfaction problem-solving (via Depth-First Search), and zero-dependency state management. 

## 🚀 The Engineering Case
As a professional transitioning from **Operations, Supply Chain, and Financial Analysis** into **Data Analytics & Software Engineering**, I architected this application to demonstrate my ability to translate complex, real-world business constraints into robust, executable code. 

In supply chain and finance, data integrity and strict operational rules are paramount. I applied this operational rigor to software architecture, specifically highlighting my capabilities in:
1. **Algorithmic Problem Solving:** Converting FIFA's convoluted 3rd-place advancement regulations into a dynamic, mathematically flawless routing algorithm.
2. **Constraint Satisfaction:** Engineering recursive data structures that resolve edge-case collisions without manual intervention.
3. **State & Memory Management:** Building a resilient, offline-first memory pipeline that protects data integrity across continuous DOM mutations.

## 🧠 Core Architecture & Logic Engines

### 1. The Group Stage Harvester & Real-Time Sorter
The engine continuously monitors inputs across 72 group stage matches, calculating Wins, Draws, Losses, Goals For, Goals Against, and Goal Difference dynamically. To handle FIFA's strict tie-breaker hierarchy (`Points > GD > GF`), a custom multi-tier sorting algorithm processes the data matrix in real-time, repainting the 12 group tables efficiently to prevent DOM reflow bottlenecks and memory leaks.

### 2. Constraint Satisfaction: The DFS Backtracking Algorithm
The most mathematically complex rule in the expanded 2026 format is routing the 8 advancing 3rd-place teams without violating bracket constraints. 
* **The Computational Problem:** A naive mapping of teams leads to illegal collisions where multiple groups satisfy the requirements for a single downstream bracket slot.
* **The Algorithmic Solution:** I engineered a **Performance-Ranked Depth-First Search (DFS) Backtracking Algorithm**. Once the 144 group stage appearances are finalized, the engine ranks the qualifying 3rd-place teams strictly by performance. The recursive DFS algorithm then traverses the tournament tree, dynamically drafting teams into available slots, backtracking upon detecting constraint violations, and mathematically guaranteeing a flawless, collision-free routing topology.

### 3. Dynamic DOM Observation & Deadlock Resolution
Knockout matches cannot end in a draw, presenting a UX and state-management challenge. Instead of relying on native browser prompts, I implemented a dynamic DOM observer. When a knockout match evaluates to a draw, the engine intercepts the state change and dynamically injects hidden penalty shoot-out parameters into the DOM. These metrics are instantly synchronized to a read-only Knockout Wall Chart dashboard, maintaining strict MVC (Model-View-Controller) separation within a vanilla environment.

### 4. Deterministic Dual-Timezone Parser
Relying on native browser `toLocaleTimeString` APIs introduces vulnerabilities where OS-level locale settings can override application intent. To ensure deterministic rendering, I built a custom mathematical parser that extracts raw temporal data from UTC strings, forcing the UI to render highly reliable dual local-time displays regardless of the client's underlying system configurations.

### 5. Offline-First Memory Pipeline & Sync Engine
Operating entirely client-side, the application utilizes a custom `localStorage` pipeline constructed around immutable `data-match-id` keys. A dedicated **Sync Engine** simultaneously clones the physical input state from the active Master Tracker to the passive visual Wall Chart, ensuring total structural integrity and preventing phantom data propagation if upstream variables are modified.

## 👨‍💻 The Architect

* **Pedrus Niloy Rozario** — *Lead Data Architect & Developer*
  * Designed the data pipeline, built the core mathematical logic, optimized the DFS routing algorithm, and managed the deployment architecture.

## 🔗 Live Deployment
This application is integrated with GitHub and auto-deploys via Netlify, representing a production-ready artifact of my engineering capabilities. 
**[View the Live Application Here](https://fifascorechart.netlify.app/)**
