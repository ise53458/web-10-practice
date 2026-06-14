// Demo 4 - API Service Layer + environment variables
//
// Demo Instructions
//  1. Open src/services/api.js -- show BASE_URL from import.meta.env
//  2. Open .env -- show VITE_API_URL
//  3. Run this demo -- PostList calls api.getPosts(), displays results
//  4. Kill the backend -> show the error thrown by the service layer
//  5. The component has NO idea what the URL is
//
// Demo Points
//  - import.meta.env is replaced at BUILD time -- values end up in the bundle
//  - Never put secret keys here -- anyone can read the compiled JS
//  - The service layer is the only place that knows about HTTP; components
//    just call functions and handle data or errors

import { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function ServiceLayerDemo() {
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    api.getPosts()
      .then(data => { setPosts(data);        setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  return (
    <div className="demo-page">
      <h2>Demo 4 - API Service Layer</h2>
      <p className="subtitle">
        This component calls <code>api.getPosts()</code> -- it never
        mentions a URL or a <code>fetch</code>
      </p>

      {/* ENV var display */}
      <div className="card">
        <p style={{ fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.8 }}>
          <span style={{ color: '#8899aa' }}># .env</span><br />
          VITE_API_URL=<span style={{ color: '#4caf7d' }}>http://localhost:3001</span>
          <br /><br />
          <span style={{ color: '#8899aa' }}>// services/api.js</span><br />
          const BASE_URL = <span style={{ color: '#53c0f0' }}>import.meta.env.VITE_API_URL</span>;
        </p>
      </div>

      {/* Results */}
      <div className="card">
        {loading && <p className="status-loading">Fetching posts...</p>}
        {error   && <p className="status-error">Error: {error}</p>}
        {!loading && !error && (
          <ul className="post-list">
            {posts.map(post => (
              <li key={post.id}>
                <div>
                  <p style={{ fontWeight: 600 }}>{post.title}</p>
                  <p className="meta">by {post.author}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
