# 🏆 FIFA World Cup 2026 Master Tracker: Logic Engine & Data Architecture

![Status](https://img.shields.io/badge/Status-Production_Ready-brightgreen)
![Tech Stack](https://img.shields.io/badge/Stack-Vanilla_JS_%7C_HTML5_%7C_CSS3-blue)
![Deployment](https://img.shields.io/badge/Deployment-Netlify_Automated-orange)
![PWA](https://img.shields.io/badge/App-Progressive_Web_App_(PWA)-purple)

## 📌 Executive Summary
The FIFA World Cup 2026 Master Tracker is a high-performance, offline-first web application engineered to simulate, calculate, and route the mathematically complex 104-match tournament. 

Designed entirely without frontend frameworks (e.g., React, Vue), this project serves as a demonstration of fundamental software engineering principles. It showcases advanced algorithm design, constraint satisfaction problem-solving (via Depth-First Search), and a zero-dependency state management pipeline. 

## 🚀 The Engineering Case
As a professional transitioning from **Operations, Supply Chain, and Financial Analysis** into **Data Analytics & Software Engineering**, I architected this application to demonstrate my ability to translate complex, real-world business constraints into robust, executable code. 

In supply chain and finance, data integrity and strict operational rules are paramount. I applied this operational rigor to software architecture, specifically highlighting my capabilities in:
1. **Algorithmic Problem Solving:** Converting FIFA's convoluted 3rd-place advancement regulations into a dynamic, mathematically flawless routing algorithm.
2. **Stateless Data Compression:** Engineering a Base64 URL sharing protocol that allows complex bracket states to be shared globally without relying on expensive database infrastructure.
3. **State & Memory Management:** Building a resilient, offline-first memory pipeline that protects data integrity across continuous DOM mutations.

## 🧠 Core Architecture & Logic Engines

### 1. Constraint Satisfaction: The DFS Backtracking Algorithm
The most mathematically complex rule in the expanded 2026 format is routing the 8 advancing 3rd-place teams without violating bracket constraints. 
* **The Computational Problem:** A naive mapping of teams leads to illegal collisions where multiple groups satisfy the requirements for a single downstream bracket slot.
* **The Algorithmic Solution:** I engineered a **Performance-Ranked Depth-First Search (DFS) Backtracking Algorithm**. The recursive DFS algorithm traverses the tournament tree, dynamically drafting teams into available slots, backtracking upon detecting constraint violations, and mathematically guaranteeing a flawless routing topology.

### 2. Progressive Web App (PWA) Offline Engine
The application is fully configured as a Progressive Web App. Utilizing a custom `sw.js` Service Worker and `manifest.json`, the entire application caches locally on the client's device. This allows users to install the application directly to their iOS/Android home screens and execute 104-match simulations entirely offline.

### 3. Stateless URL Sharing & Compression
To circumvent the need for a backend database (e.g., MongoDB, PostgreSQL), I engineered a stateless URL compression algorithm. When a user clicks "Share Bracket", the application serializes the entire 104-match data state, encodes it using `btoa` Base64 compression, and appends it to the URL query string. When a recipient opens the link, the engine deserializes the payload and perfectly reconstitutes the tournament state.

### 4. The "Monte Carlo" Auto-Simulator
A built-in physics and probability engine that allows users to instantly auto-populate the entire 104-match bracket. The algorithm assigns randomized, historically realistic soccer scorelines (weighted heavily toward 1-0, 2-1, and 1-1 results) to evaluate the engine's processing capabilities under maximum computational load.

### 5. Dynamic DOM Observation & Deadlock Resolution
Knockout matches cannot end in a draw. I implemented a dynamic DOM observer that intercepts deadlock states (e.g., 1-1 ties). When a draw evaluates, the engine dynamically injects hidden penalty shoot-out parameters into the DOM, which are evaluated to advance the correct victor without interrupting the user flow.

## 👨‍💻 The Architect

* **Pedrus Niloy Rozario** — *Lead Data Architect & Developer*
  * Designed the data pipeline, built the core mathematical logic, optimized the DFS routing algorithm, and managed the deployment architecture.

## 🔗 Live Deployment
This application is integrated with GitHub and auto-deploys via Netlify.
**[View the Live Application Here](https://fifascorechart.netlify.app/)**
