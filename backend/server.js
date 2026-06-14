// Web 10 Demo Backend -- Express REST API
//
// Run:  node server.js

const express = require('express');
const cors    = require('cors');

const app  = express();
const PORT = 3001;
const ORIGIN = 'http://localhost:5173';

app.use(cors({ origin: ORIGIN })); // Cross origin
app.use(express.json());

// --- In-memory data --------------------------------------------------------

let posts = [
  { id: 1, title: 'Hello World',        author: 'Alice', body: 'My first post.' },
  { id: 2, title: 'React is great',     author: 'Bob',   body: 'Hooks changed everything.' },
  { id: 3, title: 'Node + Express tip', author: 'Alice', body: 'Keep your routes thin.' },
];
let nextId = 4;

// --- Routes ----------------------------------------------------------------

// GET /api/posts
app.get('/api/posts', (req, res) => {
  // Simulate a small network delay so loading states are visible in demos
  setTimeout(() => res.json(posts), 600);
});

// POST /api/posts
app.post('/api/posts', (req, res) => {
  const { title, author, body } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'title and author are required' });
  }
  const post = { id: nextId++, title, author, body: body || '' };
  posts.push(post);
  setTimeout(() => res.json(post), 400);
});

// DELETE /api/posts/:id
app.delete('/api/posts/:id', (req, res) => {
  const id   = Number(req.params.id);
  const idx  = posts.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Post not found' });
  posts.splice(idx, 1);
  res.json({ deleted: id });
});

// --- Error simulation endpoint (used in Demo 6) ----------------------------
// Hit GET /api/posts?fail=1 to force a 500 response

app.use((req, res, next) => {
  if (req.query.fail === '1') {
    return res.status(500).json({ error: 'Simulated server error' });
  }
  next();
});

app.listen(PORT, () =>
  console.log(`Web 10 demo backend running -> http://localhost:${PORT}`)
);
