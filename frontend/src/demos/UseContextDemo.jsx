// -----------------------------------------------------------------------------
// DEMO 3 -- useContext: theme toggle without prop drilling
//
// Demo Instructions
//  1. ThemeContext created at module level
//  2. Provider wraps the tree -- value flows down
//  3. ThemedBox reads the theme directly -- Toolbar is completely unaware
//  4. Live: add a third nested component that also reads context
//
// Demo Points
//  - Toolbar doesn't receive OR pass the theme -- that's the whole point
//  - Context is a "broadcast" -- any descendant can subscribe
//  - It does NOT replace useState -- state still lives somewhere (App here)
//  - Overuse of context -> hard to trace where data comes from; use sparingly
// -----------------------------------------------------------------------------

import { createContext, useContext, useState } from 'react';

// -- 1. Create the context (module-level, shared across components) ----------
const ThemeContext = createContext('light');

// -- 2. Consumers -- these components never receive theme as a prop -----------

function ThemedBox() {
  const theme = useContext(ThemeContext);   // reads from context directly

  return (
    <div className={`themed-box ${theme}`}>
      <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>ThemedBox</p>
      <p style={{ fontSize: '0.9rem' }}>
        Current theme: <strong>{theme}</strong>
      </p>
      <p style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '0.5rem' }}>
        (I got this from context -- not from a prop)
      </p>
    </div>
  );
}

function Toolbar() {
  // Toolbar is a middleman -- it renders ThemedBox but knows NOTHING about theme
  return (
    <div style={{ border: '1px dashed var(--border)', borderRadius: 8, padding: '1rem' }}>
      <p style={{ color: 'var(--muted)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
        &lt;Toolbar&gt; -- no theme prop, no context read, just renders children
      </p>
      <ThemedBox />
    </div>
  );
}

// -- 3. Provider lives at the top -- owns the state --------------------------

export default function UseContextDemo() {
  const [theme, setTheme] = useState('light');

  const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <div className="demo-page">
      <h2>Demo 3 -- useContext</h2>
      <p className="subtitle">
        Theme state lives in <code>App</code>, consumed in <code>ThemedBox</code> --
        <code>Toolbar</code> is completely unaware
      </p>

      {/* Provider wraps everything that needs the value */}
      <ThemeContext.Provider value={theme}>
        <div className="card">
          <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
            &lt;UseContext Demo&gt; -- owns state, provides context
          </p>
          <div style={{ marginBottom: '1rem' }}>
            <button onClick={toggle}>
              Switch to {theme === 'light' ? 'dark' : 'light'} theme
            </button>
          </div>
          <Toolbar />
        </div>
      </ThemeContext.Provider>

      {/* Component tree diagram */}
      <div className="card">
        <p style={{ fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.9, color: 'var(--muted)' }}>
          <span style={{ color: '#53c0f0' }}>App</span>  (owns: theme state, provides context)<br />
          &nbsp;+-- <span style={{ color: 'var(--text)' }}>Toolbar</span>  <span style={{ color: '#e94560' }}>??? no theme prop here</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- <span style={{ color: '#4caf7d' }}>ThemedBox</span>  <span style={{ color: '#4caf7d' }}>??? reads context directly</span>
        </p>
      </div>
    </div>
  );
}
