// -----------------------------------------------------------------------------
// DEMO 5 -- Three-state pattern: loading / error / success
//
// Demo Instructions
//  1. Load the page -> loading state visible (backend has a 600ms delay)
//  2. Data appears -> success state
//  3. DevTools -> Network -> throttle to Slow 3G -> refresh -> loading state lingers
//  4. Kill the backend -> Retry button -> error state
//  5. Delete a post -> optimistic removal from local state (no refetch needed)
//
// Demo Points
//  - Always handle all three states -- blank screen on load is a bug, not a feature
//  - The `load` function is extracted so the Retry button can call it too
//  - Deleting: remove from local state immediately rather than re-fetching the
//    whole list (optimistic update -- fast, but assumes the server will succeed)
// -----------------------------------------------------------------------------

import { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function ThreeStateDemo() {
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // -- Extracted load function -- called on mount AND by Retry button ----------
  const load = () => {
    setLoading(true);
    setError(null);

    api.getPosts()
      .then(data => { setPosts(data);        setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  // -- Delete: remove from state immediately (optimistic) --------------------
  const handleDelete = (id) => {
    api.deletePost(id)
      .then(() => setPosts(prev => prev.filter(p => p.id !== id)))
      .catch(err => alert(`Delete failed: ${err.message}`));
  };

  // -- Render -----------------------------------------------------------------
  return (
    <div className="demo-page">
      <h2>Demo 5 -- Three-State Pattern</h2>
      <p className="subtitle">
        Every API call has three states -- always render all three
      </p>

      {/* State diagram -- visible while talking */}
      <div className="card">
        <div style={{
          display: 'flex', gap: '1rem', justifyContent: 'center',
          flexWrap: 'wrap', fontSize: '0.9rem',
        }}>
          {[
            { label: 'loading',  color: '#53c0f0', active: loading },
            { label: 'error',    color: '#e94560', active: !!error },
            { label: 'success',  color: '#4caf7d', active: !loading && !error },
          ].map(s => (
            <div key={s.label} style={{
              padding: '0.5rem 1rem',
              borderRadius: 6,
              border: `2px solid ${s.color}`,
              background: s.active ? s.color + '33' : 'transparent',
              color: s.color,
              fontWeight: s.active ? 700 : 400,
              transition: 'background 0.3s',
            }}>
              {s.active ? '??? ' : ''}{s.label}
            </div>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="card">
          <p className="status-loading">Loading posts???</p>
          {/* Skeleton placeholders */}
          <div style={{ marginTop: '0.75rem' }}>
            {[80, 60, 70].map((w, i) => (
              <div key={i} className="skeleton" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="card">
          <p className="status-error" style={{ marginBottom: '0.75rem' }}>
            ??? {error}
          </p>
          <button onClick={load}>Retry</button>
        </div>
      )}

      {/* Success */}
      {!loading && !error && (
        <div className="card">
          <ul className="post-list">
            {posts.map(post => (
              <li key={post.id}>
                <div>
                  <p style={{ fontWeight: 600 }}>{post.title}</p>
                  <p className="meta">by {post.author}</p>
                </div>
                <button
                  className="secondary"
                  style={{ fontSize: '0.8rem', padding: '0.3rem 0.7rem' }}
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          {posts.length === 0 && (
            <p style={{ color: 'var(--muted)', textAlign: 'center' }}>
              No posts. <button className="secondary" onClick={load} style={{ fontSize: '0.85rem' }}>Reload</button>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
