### File 2: `Architecture_Handover`

```markdown
# 🏆 FIFA World Cup 2026 Master Tracker 
## Developer Handover & Architecture Notebook
**Version:** 1.0 (Production Candidate)
**Author / Lead Architect:** Pedrus Niloy Rozario
**Date:** June 2026

---

### 1. Project Overview
The FIFA World Cup 2026 Master Tracker is a vanilla JavaScript, offline-first web application designed to mathematically simulate, track, and route the 104-match tournament. 

It was built without frontend frameworks to ensure zero dependency bloat, utilizing a custom `localStorage` state management pipeline and complex dictionary-lookup algorithms to handle FIFA's dynamic routing rules.

**Core Files:**
* `index.html`: The presentation layer, containing the Master Tracker table and the Knockout Wall Chart.
* `tournament-engine.js`: The neural logic engine, handling math, memory, routing, and UI synchronization.

---

### 2. Core Architecture & Logic Engines

#### A. The Group Stage Engine & Tie-Breakers
* **Trigger:** Listens to `.score-input` fields in Matches 1-72.
* **Logic:** Calculates Points (3 for Win, 1 for Draw), Goals For (GF), Goals Against (GA), and Goal Difference (GD).
* **Sorting Algorithm:** Applies official FIFA tie-breaker hierarchy: `Points > GD > GF`. 
* **State Management:** Dynamically renders the 12 group tables on the fly without deleting or recreating DOM elements, preventing memory leaks.

#### B. The 3rd-Place Gatekeeper & 495-Scenario Matrix
* **The Problem:** 8 out of 12 third-place teams advance. A standard Depth-First Search (DFS) algorithm fails here due to slot collisions (multiple teams mathematically fitting into the same bracket).
* **The Solution:** A **Dictionary Lookup Architecture**. The script mathematically generates the 495 possible 8-team alphabetical combinations in memory on load (via `buildFifaMatrix()`). 
* **Execution:** Once all 144 group stage appearances are locked, the engine sorts the 8 advancing groups alphabetically, hits the matrix, and routes them with 0% chance of collision.

#### C. The Knockout Routing Topology
* **HTML Mapping:** The knockout matches (73-104) are **not** sequential in the HTML. They are mapped chronologically based on official FIFA kick-off times (e.g., M76 occurs before M74). 
* **Data Flow:** The JS object `knockoutRoutes` reads the winners of the Master Tracker IDs and pushes them to downstream placeholder targets (e.g., `Winner Match 73`).
* **Phantom Data Prevention:** If a user deletes a score upstream (correcting a typo), the engine passes an empty string `""` downstream to instantly erase invalid advanced teams.

#### D. The Dynamic Penalty Shootout UI
* **Execution:** `injectPenaltyBoxes()` builds hidden input boxes inside the DOM on load.
* **Visibility Toggle:** `evaluatePenaltyVisibility()` actively monitors keystrokes. If a knockout match score evaluates to a draw (e.g., 1-1), it changes `display: none` to `display: flex` for the penalty containers. 
* **Logic Override:** `getKnockoutMatchData()` evaluates `Goals` first. If tied, it parses the dynamically revealed `Penalties` fields to declare a winner.

#### E. The Synchronization Engine
* **Dual UI Integrity:** The application maintains two visual interfaces: The Master Tracker (Data Entry) and the Wall Chart (Data Visualization).
* **Execution:** `syncWallChart()` fires on every keystroke, looping through the Master Tracker to clone physical team names and active scores into the read-only Wall Chart dashboard.

---

### 3. State Management (Offline-First)

The application does not use a backend database. It relies on a custom `localStorage` pipeline structured around specific data attributes.

* `getStableInputKey()`: Secures DOM targeting by mapping inputs to their parent `data-match-id` rather than fragile array indexes.
* `saveUI()`: Fires on every input. Constructs a JSON object capturing every physical input state.
* `loadData()`: Fires on DOM load. Injects the saved strings back into the physical inputs and triggers the calculation sequence, rendering the tournament exactly as the user left it.
* **Kill Switch:** The "Nuke Reset" function wipes the storage key but requires a double-confirmation prompt to prevent catastrophic accidental data loss.

---

### 4. Quality Assurance & Stress Testing Protocol

If you are a developer or an LLM tasked with debugging or modifying this codebase, execute the following stress tests to ensure structural integrity:

#### Test 1: The Phantom Data Test
1. Input a score to advance a team to the Round of 32.
2. Delete that score (leave the boxes blank).
3. **Expected Result:** The team must immediately disappear from the downstream placeholders in both the Master Tracker and the Wall Chart. 

#### Test 2: The 495-Matrix Gatekeeper Test
1. Fill out all 72 Group Stage matches.
2. Ensure at least one group (e.g., Group D) has a 3rd-place team with high points. 
3. **Expected Result:** The engine must automatically inject 8 teams into the Round of 32. It should mathematically be impossible for a team to be routed to a conflicting match ID.

#### Test 3: The Penalty Deadlock Test
1. In Match 73 (Round of 32), type a score of `1 - 1`.
2. **Expected Result:** Gold penalty boxes must instantly appear below the main scores.
3. Type `4` and `5` in the penalty boxes.
4. **Expected Result:** The team with 5 penalties must advance to Match 90 (Quarter Final). The bracket must not freeze.

#### Test 4: The Timezone Parser Test
1. Change your local computer operating system timezone to Tokyo (JST) or Sydney (AEST).
2. Reload the page.
3. **Expected Result:** The local times next to the matches must shift mathematically based on the UTC string in the HTML `data-time` attribute, ignoring native browser localization overrides.

***

**End of Document**
