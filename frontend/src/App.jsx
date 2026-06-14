// App.jsx -- demo navigator
// One component per demo, switched by clicking the nav bar.
// No router needed -- keeps the setup simple for class.

import { useState } from 'react';
import UseStateDemo    from './demos/UseStateDemo';
import UseEffectDemo   from './demos/UseEffectDemo';
import UseContextDemo  from './demos/UseContextDemo';
import ServiceLayerDemo from './demos/ServiceLayerDemo';
import ThreeStateDemo  from './demos/ThreeStateDemo';

const DEMOS = [
  { id: 1, label: '1 ?? useState',      component: UseStateDemo    },
  { id: 2, label: '2 ?? useEffect',     component: UseEffectDemo   },
  { id: 3, label: '3 ?? useContext',    component: UseContextDemo  },
  { id: 4, label: '4 ?? Service Layer', component: ServiceLayerDemo },
  { id: 5, label: '5 ?? Three States',  component: ThreeStateDemo  },
];

export default function App() {
  const [active, setActive] = useState(1);
  const Current = DEMOS.find(d => d.id === active).component;

  return (
    <>
      <nav>
        <span>Web 10 Demos</span>
        {DEMOS.map(d => (
          <button
            key={d.id}
            onClick={() => setActive(d.id)}
            className={active === d.id ? 'active' : ''}
          >
            {d.label}
          </button>
        ))}
      </nav>
      <Current />
    </>
  );
}
