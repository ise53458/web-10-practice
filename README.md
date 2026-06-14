# Web 10 Demo — React Hooks & Full-Stack Integration

One React app + one Express backend, covering in-class demos.

---

## Setup (do this before class)

### Backend

```bash
cd backend
npm install
node server.js
# → running on http://localhost:3001
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# → running on http://localhost:5173
```

Open **http://localhost:5173** in your browser. Leave both terminals running side by side.

---

## Demo guide

Navigate between demos using the top nav bar.

### Demo 1 — `useState` 

**File:** `src/demos/UseStateDemo.jsx`

What to test:
1. Click `+1` and `×2` — point out the counter updates immediately
2. Ask students: *why write `prev => prev + 1` instead of `count + 1`?*
3. Show the inline code block at the bottom — explain stale closure risk
4. **Live edit:** comment out the functional update on `increment`, replace with
   `setCount(count + 1)`, run a rapid triple-click sequence and explain why
   it can produce incorrect results when batched

---

### Demo 2 — `useEffect` 

**File:** `src/demos/UseEffectDemo.jsx`

What to show:
1. Load demo — "Loading user 1…" appears, then data
2. Click **User 2**, **User 3** — notice the effect re-runs each time
3. Open DevTools → Network tab
4. Click between users quickly — show the in-flight requests in the Network tab;
   explain that without the `cancelled` flag, a slow response could overwrite
   a newer result
5. **Talking point:** point to `return () => { cancelled = true; }` — this line
   is the cleanup; ask *"what happens if we remove it?"*

---

### Demo 3 — `useContext` 

**File:** `src/demos/UseContextDemo.jsx`

What to inspect:
1. Click **Switch theme** — ThemedBox changes without Toolbar receiving any prop
2. Point to the component tree diagram at the bottom
3. Open the file live — show that `Toolbar` has no `theme` parameter anywhere
4. **Live edit:** Add a second `ThemedBox` inside `Toolbar` — it picks up the
   context instantly without any additional wiring

---

### Demo 4 — API Service Layer 

**Requires backend running.**
**File:** `src/demos/ServiceLayerDemo.jsx`, `src/services/api.js`

What to inspect:
1. Open `src/services/api.js` in your editor — walk through `BASE_URL` and
   `request()` before switching to the browser
2. Load the demo — posts appear from `localhost:3001`
3. Open `.env` in editor — show `VITE_API_URL=http://localhost:3001`
4. **Kill the backend** (`Ctrl+C` in backend terminal) → reload the demo →
   error message appears — show that the error comes from the service layer,
   not from the component
5. Restart backend: `node server.js` → reload → works again

**Key point to make:** the component (`Demo4_ServiceLayer.jsx`) never mentions
a URL, a fetch, or HTTP. It just calls `api.getPosts()`.

---

### Demo 5 — Three-State Pattern 

**Requires backend running.**
**File:** `src/demos/Demo5_ThreeState.jsx`

What to inspect:
1. Load demo — the state indicator shows **loading** is active, skeleton bars
   appear, then transitions to **success**
2. DevTools → Network → Throttle: **Slow 3G** → reload → hold on loading state
3. Restore **No throttling**
4. **Kill the backend** → click Retry → **error** state appears
5. Restart backend → click Retry → **success** state returns
6. Delete a post — point out it's removed from local state immediately
   (optimistic update) without a full re-fetch

---

## File structure

```
web-10-practice/
  backend/
    server.js          Express API (posts CRUD, 600ms delay for demo)
    package.json
  frontend/
    .env               VITE_API_URL (already set, never commit to git)
    src/
      services/
        api.js         ← service layer (show this in Demo 4)
      demos/
        Demo1_UseState.jsx
        Demo2_UseEffect.jsx
        Demo3_UseContext.jsx
        Demo4_ServiceLayer.jsx
        Demo5_ThreeState.jsx
      App.jsx          nav bar + demo switcher
      main.jsx
      index.css
```

---

## Troubleshooting

**Posts not loading in Demo 4/5:**
- Check the backend is running: `node backend/server.js`
- Check `.env` exists in `frontend/` and contains `VITE_API_URL=http://localhost:3001`
- Check the browser console for CORS errors (origin must be `http://localhost:5173`)

**`npm run dev` fails:**
- Node.js 18+ required
- Run `npm install` inside the `frontend/` directory first

**CORS error in browser:**
- The backend CORS config allows `http://localhost:5173` (Vite default)
- If your frontend runs on a different port, update `origin` in `backend/server.js`
