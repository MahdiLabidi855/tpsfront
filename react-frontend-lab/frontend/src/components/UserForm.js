import { useState } from 'react';

const UserForm = () => {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!input.trim()) {
      alert("Le champ ne peut pas être vide !");
      return;
    }
    setMessage(`Vous avez saisi : ${input}`);
  };

  return (
    <div className="container mt-4">
      <h2>Formulaire</h2>
      <input
        type="text"
        className="form-control"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="btn btn-primary mt-2" onClick={handleSubmit}>Soumettre</button>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default UserForm;
