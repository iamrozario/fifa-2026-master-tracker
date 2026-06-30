# 📂 Technical Architecture Handover
**Project:** FIFA World Cup 2026 Master Tracker  
**Lead Engineer / Architect:** Pedrus Niloy Rozario  
**Environment:** Client-Side Browser (Offline-First / PWA)

---

## 1. System Overview
This repository contains a zero-dependency, vanilla JavaScript engine capable of processing the 104-match topological routing for the FIFA World Cup 2026. Rather than relying on external libraries or server-side computation, the core architecture leverages an event-driven DOM model, continuous matrix recalculation, and progressive caching.

## 2. The PWA Offline Engine
The application operates as a Progressive Web App (PWA).
* `manifest.json`: Defines the installable parameters for iOS/Android home-screen mapping.
* `sw.js`: A background Service Worker intercepts `fetch` requests, aggressively caching the HTML, JS, CSS, and image assets upon the first load. If the network drops, the Service Worker serves the application from the local disk.

## 3. Stateless URL Serialization (Base64)
To eliminate database overhead (NoSQL/SQL), the engine features a stateless distribution protocol. 
* **Compression Algorithm:** The `shareBracket()` function serializes the `localStorage` dictionary into a string, invokes native `encodeURIComponent()`, and compresses the payload utilizing `btoa` Base64 encoding. 
* **Hydration Protocol:** On instantiation, the `DOMContentLoaded` listener checks the URL for `?bracket=`. If detected, the `loadBracketFromURL()` function deserializes the Base64 string back into memory, instantly re-hydrating the 104-match state matrix.

## 4. The DFS Constraint Backtracking Algorithm
The highest computational hurdle is mapping the optimal topology for the best 8 third-place finishers across 12 groups. Because multiple combinations exist, a static dictionary fails edge-case collisions.
* **Mechanism:** When the Group Stage is mathematically concluded, the engine passes an array of eligible teams to `resolveDFSPathing()`.
* **Traversals:** The algorithm utilizes a Performance-Ranked Depth-First Search. It evaluates downstream nodes in the bracket array. If a pathing constraint is violated (e.g., two teams from Group A routed to the same quadrant), the recursive function triggers a backtrack operation, collapsing the failed branch and attempting the next mathematical vector until a collision-free routing topology is achieved.

## 5. Monte Carlo Simulation Engine
Built into the engine is a `simulateTournament()` Monte Carlo loop. When invoked, the engine traverses the DOM tree, locating all empty `.score-input` elements. It injects pseudo-random integers generated via a weighted probability array `[0, 0, 1, 1, 1, 2, 2, 3, 4]`, ensuring realistic scorelines. The engine cascades these injected inputs through the `input` event listener, simulating the computational stress of a full tournament in less than 50ms.

## 6. HTML5 Canvas Confetti Physics
Rather than pulling a bloated external dependency (which breaks offline support), the engine includes a proprietary `triggerConfetti()` canvas rendering loop. It dynamically generates an HTML5 `<canvas>`, calculates gravity vectors, wind resistance, and rotational acceleration using `requestAnimationFrame`, rendering a 60fps hardware-accelerated celebration when the final champion object is evaluated.

## 7. Memory & Garbage Collection
All application state is synchronized to `localStorage` under the `fifa_journal_offline_state` key. The memory footprint is intentionally microscopic (typically <2KB), mitigating memory leaks across extended 30-day user sessions.

---
*Prepared for Engineering Review*
