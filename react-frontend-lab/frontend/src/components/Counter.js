import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="container mt-4">
      <h2>Compteur</h2>
      <p>Valeur : {count}</p>
      <button className="btn btn-success me-2" onClick={() => setCount(count + 1)}>+</button>
      <button className="btn btn-danger" onClick={() => setCount(count > 0 ? count - 1 : 0)}>-</button>
    </div>
  );
};

export default Counter;
