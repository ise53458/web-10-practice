// -----------------------------------------------------------------------------
// DEMO 2 -- useEffect: dependency array and cleanup
//
// Demo Instructions
//  1. Fetch runs on mount ([] dependency)
//  2. Change userId -> effect re-runs for new user
//  3. The `cancelled` flag prevents stale state updates
//  4. Open Network tab -> see the in-flight request when you switch users fast
//
// Demo Points
//  - The return function IS the cleanup -- runs before next effect or on unmount
//  - Without cleanup: if user clicks "Next" before fetch completes, the slow
//    response can overwrite the new user's data (race condition)
//  - Rule: if your effect "starts" something, the cleanup should "stop" it
// -----------------------------------------------------------------------------

import { useState, useEffect } from 'react';

// Public API -- no backend needed for this demo
const API = 'https://jsonplaceholder.typicode.com/users';

export default function Demo2_UseEffect() {
  const [userId, setUserId]   = useState(1);
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // -- The effect ------------------------------------------------
  useEffect(() => {
    let cancelled = false;    // cleanup flag -- set to true on teardown

    setLoading(true);
    setError(null);

    fetch(`${API}/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (!cancelled) {     // only update state if still mounted
          setUser(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };  // ??? cleanup runs before next effect

  }, [userId]);              // ??? re-run whenever userId changes

  // -- Render ----------------------------------------------------
  return (
    <div className="demo-page">
      <h2>Demo 2 -- useEffect</h2>
      <p className="subtitle">
        Dependency array + cleanup flag -- fetches re-run when{' '}
        <code>userId</code> changes
      </p>

      {/* User selector */}
      <div className="card">
        <p style={{ marginBottom: '0.75rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
          Select user (changes the dependency {'->'}  effect re-runs)
        </p>
        <div className="button-row">
          {[1, 2, 3, 4, 5].map(id => (
            <button
              key={id}
              onClick={() => setUserId(id)}
              className={userId === id ? '' : 'secondary'}
            >
              User {id}
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      <div className="card">
        {loading && <p className="status-loading">Loading user {userId}???</p>}
        {error   && <p className="status-error">Error: {error}</p>}
        {!loading && !error && user && (
          <div>
            <p style={{ fontSize: '1.1rem', fontWeight: 700 }}>{user.name}</p>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{user.email}</p>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{user.company?.name}</p>
          </div>
        )}
      </div>

      {/* Dependency explainer */}
      <div className="card">
        <p style={{ fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.8 }}>
          <span style={{ color: '#8899aa' }}>// Effect re-runs when userId changes</span><br />
          useEffect(() =&gt; {'{'}<br />
          &nbsp;&nbsp;let cancelled = false;<br />
          &nbsp;&nbsp;fetch(`/users/<span style={{ color: '#53c0f0' }}>$&#123;userId&#125;</span>`).then(...)<br />
          &nbsp;&nbsp;return () =&gt; {'{ cancelled = true; }'}  <span style={{ color: '#8899aa' }}>// cleanup</span><br />
          {'}'}, [<span style={{ color: '#e94560' }}>userId</span>]);  <span style={{ color: '#8899aa' }}>// ??? dependency</span>
        </p>
      </div>
    </div>
  );
}
