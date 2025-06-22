import { useEffect, useState } from 'react';
import { useBearStore } from '../../Stores/global';

export default function TestComponent() {
  const [status, setStatus] = useState(null);

  function BearCounter() {
    const bears = useBearStore((state) => state.bears);
    return <h1>{bears} bears around here...</h1>;
  }

  function Controls() {
    const increasePopulation = useBearStore(
      (state) => state.increasePopulation
    );
    return <button onClick={increasePopulation}>one up</button>;
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/`)
      .then((res) => res.json())
      .then((data) => setStatus(data))
      .catch((err) => {
        console.error('❌ Failed to fetch:', err);
        setStatus({ error: true });
      });
  }, []);

  return (
    <div>
      <h2>API Status</h2>
      {status ? JSON.stringify(status, null, 2) : 'Loading...'}
      <BearCounter />
      <Controls />
    </div>
  );
}
