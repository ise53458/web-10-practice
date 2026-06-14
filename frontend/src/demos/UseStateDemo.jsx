// -----------------------------------------------------------------------------
// DEMO 1 -- useState: functional updates
//
// Demo Instructions
//  1. Basic state: count renders, button calls setter
//  2. Why `prev => prev + 1` is safer than `count + 1`
//  3. Live: add the "Double" button together with students
//
// Demo Points
//  - Every setState call triggers a re-render
//  - Functional update reads the *current* value at call time
//  - Useful when multiple updates might batch together (React 18)
// -----------------------------------------------------------------------------

import { useState } from 'react';

export default function Demo1_UseState() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);   // ??? functional update
  const decrement = () => setCount(prev => prev - 1);
  const reset     = () => setCount(0);                  // ??? direct value (fine here)
  const double    = () => setCount(prev => prev * 2);   // ??? add live with class

  return (
    <div className="demo-page">
      <h2>Demo 1 -- useState</h2>
      <p className="subtitle">
        Functional updates: why <code>prev =&gt; prev + 1</code> is safer than{' '}
        <code>count + 1</code>
      </p>

      <div className="card">
        <div className="counter-display">{count}</div>

        <div className="button-row">
          <button onClick={decrement}>- 1</button>
          <button onClick={increment}>+ 1</button>
          <button onClick={double}> x 2</button>
          <button className="secondary" onClick={reset}>Reset</button>
        </div>
      </div>

      {/* -- Inline explanation -- visible on slide/projector -- */}
      <div className="card">
        <p style={{ fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.7 }}>
          <span style={{ color: '#8899aa' }}>// Functional update -- always reads latest value</span><br />
          <span style={{ color: '#53c0f0' }}>setCount</span>(prev =&gt; prev + 1)<br />
          <br />
          <span style={{ color: '#8899aa' }}>// Closure over stale value -- can be wrong when batched</span><br />
          <span style={{ color: '#e94560' }}>setCount</span>(count + 1)
        </p>
      </div>
    </div>
  );
}
