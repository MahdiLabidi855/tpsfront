const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Pour sécuriser les mots de passe
const jwt = require('jsonwebtoken'); // Pour token JWT (optionnel)
const app = express();
const port = 82;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion à MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // ton user MySQL
  password: 'root',      // ton mot de passe
  database: 'gestion_equipes'
});

db.connect(err => {
  if (err) {
    console.error('Erreur de connexion MySQL:', err);
  } else {
    console.log('MySQL connecté');
  }
});
// Sign Up
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ message: 'Tous les champs sont requis' });

  // Hash du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json({ id: results.insertId, username, email });
    }
  );
});
// ====================== SIGN IN ======================
app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  console.log("BODY SIGNIN =", req.body);

  if (!email || !password)
    return res.status(400).json({ message: "Email et mot de passe requis" });

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    const user = results[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Mot de passe incorrect" });

    res.json({
      message: "Connexion réussie",
      user: { id: user.id, username: user.username, email: user.email }
    });
  });
});
// Obtenir toutes les équipes
app.get('/equipes', (req, res) => {
  db.query('SELECT * FROM equipes', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});
// Ajouter une équipe avec nom et country
app.post('/equipes', (req, res) => {
  const { nom, country } = req.body;
  db.query(
    'INSERT INTO equipes (nom, country) VALUES (?, ?)',
    [nom, country],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json({ id: results.insertId, nom, country });
    }
  );
});
// Modifier une équipe par id
app.put('/equipes/:id', (req, res) => {
  const { id } = req.params;
  const { nom, country } = req.body;

  db.query(
    'UPDATE equipes SET nom = ?, country = ? WHERE id = ?',
    [nom, country, id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Équipe mise à jour' });
    }
  );
});
// Supprimer une équipe par id
app.delete('/equipes/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM equipes WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Équipe supprimée' });
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur backend démarré sur http://localhost:${port}`);
});
