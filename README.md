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

---

### Demo 2 — `useEffect` 

**File:** `src/demos/UseEffectDemo.jsx`

---

### Demo 3 — `useContext` 

**File:** `src/demos/UseContextDemo.jsx`

---

### Demo 4 — API Service Layer 

**Requires backend running.**
**File:** `src/demos/ServiceLayerDemo.jsx`, `src/services/api.js`


---

### Demo 5 — Three-State Pattern 

**Requires backend running.**
**File:** `src/demos/Demo5_ThreeState.jsx`

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
