### File 2: `Architecture_Handover`

```markdown
# 🏆 FIFA World Cup 2026 Master Tracker 
## System Architecture & Technical Specifications
**Version:** 1.0 (Production Candidate)
**Lead Architect:** Pedrus Niloy Rozario
**Date:** June 2026

---

### 1. Architectural Overview
The FIFA World Cup 2026 Master Tracker is a vanilla JavaScript, offline-first application engineered to mathematically simulate, track, and route a complex 104-match tournament. 

Deliberately built without abstraction layers or frontend frameworks, the system relies on native DOM manipulation, deterministic algorithmic routing, and a zero-dependency `localStorage` state management pipeline. This architecture ensures absolute computational transparency and eliminates framework-specific overhead.

**Core Technical Stack:**
* `index.html`: The presentation and structural layer, encompassing the Master Tracker matrix and the Knockout topology.
* `tournament-engine.js`: The central logic controller responsible for state persistence, algorithmic routing, constraint satisfaction, and dynamic UI synchronization.

---

### 2. Algorithmic Modules & Logic Engines

#### A. The Group Stage Matrix & Tie-Breaker Heuristics
* **Event Listener Topology:** Monitors `.score-input` elements across matches 1-72 via highly efficient event delegation to minimize memory consumption.
* **Mathematical State:** Computes Points (3 for Win, 1 for Draw), Goals For (GF), Goals Against (GA), and Goal Difference (GD) in real-time.
* **Sorting Heuristics:** Implements a strict, multi-tiered sorting algorithm evaluating official FIFA tie-breaker hierarchies: `Points > GD > GF`. 
* **DOM Optimization:** Dynamically updates node text contents for the 12 group tables on the fly without destructive DOM recreation, strictly preventing memory leaks and layout thrashing.

#### B. Constraint Satisfaction: Dynamic DFS Backtracking
* **The Computational Problem:** 8 out of 12 third-place teams advance. A static algorithmic assignment methodology fails because purely alphabetical combinations destroy the relative performance hierarchy necessary to draft teams into legally compliant FIFA slots.
* **The Solution:** A **Performance-Ranked DFS Backtracking Architecture**. 
* **Execution Protocol:** Upon validation of all 144 group stage variables, the engine sorts the qualifying 3rd-place teams dynamically by performance (`Points > GD > GF`). A recursive Depth-First Search (DFS) algorithm evaluates the available Round of 32 constraints and dynamically drafts the highest-performing teams. If a constraint violation (collision) is detected, the algorithm backtracks, ensuring a mathematically flawless routing matrix with 0% error tolerance.

#### C. The Knockout Routing Topology
* **Chronological Mapping:** The knockout array (matches 73-104) is structurally non-sequential. It is mapped via chronological node traversal based on official FIFA kick-off timestamps.
* **Data Flow Architecture:** The `knockoutRoutes` object functions as a deterministic data pipeline, extracting victorious teams from upstream nodes and injecting them into designated downstream placeholder targets.
* **Phantom Data Sanitization:** To maintain state integrity, if upstream metrics are modified or deleted, the engine propagates null vectors (`""`) downstream, instantly purging invalid advanced teams from the topology.

#### D. Dynamic State Injection: The Penalty Deadlock Resolver
* **Pre-computation:** `injectPenaltyBoxes()` pre-builds hidden DOM nodes upon initialization to optimize runtime performance.
* **State Interception:** `evaluatePenaltyVisibility()` actively intercepts keystrokes. Upon detecting a mathematical deadlock in a knockout node (e.g., a 1-1 tie), it overrides display properties to spawn penalty parameters.
* **Dashboard Synchronization:** The `syncWallChart()` controller captures these penalty vectors and seamlessly paints them into the visual bracket UI (e.g., `(4)` and `(3)`), maintaining MVC integrity.
* **Logic Override:** `getKnockoutMatchData()` is programmed to evaluate `Goals` first. If a deadlock is confirmed, it parses the dynamically revealed `Penalties` vector to declare the definitive victor.

---

### 3. Data Persistence & State Management

Operating entirely client-side without an external database, the system relies on a strictly typed `localStorage` pipeline constructed around immutable HTML data attributes.

* `getStableInputKey()`: Secures DOM targeting by mapping inputs structurally to their parent `data-match-id`, completely eliminating vulnerabilities associated with fragile array indexing.
* `saveUI()`: Triggers asynchronously on every input modification. Serializes the physical input state into a localized JSON payload.
* `loadData()`: Fires sequentially on `DOMContentLoaded`. Deserializes the JSON payload and re-injects strings into physical inputs, seamlessly recreating the tournament state vector identically to the user's last interaction.
* **Fail-Safe Mechanism:** The "Nuke Reset" protocol completely purges the storage key, guarded by a double-confirmation boolean logic prompt to prevent catastrophic data loss.

---

### 4. Quality Assurance & System Stress Testing

For academic or enterprise review, execute the following stress tests to validate the engine's structural resilience:

#### Test 1: The Phantom Data Integrity Test
1. Input an arbitrary score to advance a team to the Round of 32.
2. Delete the upstream score vector (clear the inputs).
3. **Expected Result:** The system must instantly recognize the invalid state and purge the team from all downstream placeholders in both the Master Tracker and Wall Chart without locking up.

#### Test 2: The DFS Constraint Resolution Test
1. Populate all 72 Group Stage matches.
2. Ensure at least one group (e.g., Group D) generates a 3rd-place team with a dominant performance metric. 
3. **Expected Result:** The engine must automatically resolve the 3rd-place combinations and inject exactly 8 teams into the Round of 32. It must mathematically prioritize drafting the highest-ranked 3rd-place teams into available slots without generating routing collisions or infinite recursion loops.

#### Test 3: The Penalty Deadlock Resolution Test
1. In Match 73 (Round of 32), inject a deadlock state (e.g., `1 - 1`).
2. **Expected Result:** The system must intercept the tie and immediately spawn penalty parameters.
3. Inject the vectors `4` and `5` into the penalty parameters.
4. **Expected Result:** The system must evaluate the penalty vectors, advance the victor to Match 90, and explicitly synchronize the `(4)` and `(5)` state data to the visual Wall Chart UI.

***

**End of Technical Specification Document**
```
