const express = require('express')
const app = express()

app.use(express.json())

const equipes = require('./equipes.json')

app.listen(82, () => {
    console.log('REST API via ExpressJS')
})
/**
 * Importation du client MongoClient & connexion a la DB
 */
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://mahdilabidi_db_user:mest855@bdmonapi.zeqldbr.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'bdmonapi';

console.log("Test Connexion avec Mongo...");

let db;

async function connectDB() {
    try {
        const client = new MongoClient(uri);
        await client.connect();                          // <--- WORKS with Atlas
        db = client.db(dbName);
        console.log("Connexion réussie avec MongoDB ✔");
    } catch (err) {
        console.error("Erreur de connexion MongoDB ❌:", err);
    }
}

connectDB();


app.get('/equipes', (req, res) => {
    //res.send("Liste des Equipes")
    res.status(200).json(equipes)
})

app.get('/equipes/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const equipe = equipes.find(e => e.id === id)
    res.status(200).json(equipe)
})

app.post('/equipes', (req, res) => {
    equipes.push(req.body)
    res.status(200).json(equipes)
})
app.put('/equipes/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let equipe = equipes.find(equipe => equipe.id === id)
    equipe.name = req.body.name,
        equipe.country = req.body.country,
        res.status(200).json(equipe)
})
app.delete('/equipes/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let equipe = equipes.find(equipe => equipe.id === id)
    equipes.splice(equipes.indexOf(equipe), 1)
    res.status(200).json(equipes)
})  

app.get('/db/equipes', async (req, res) => {
    if (!db) return res.status(500).json({ error: "DB not connected yet" });

    try {
        const docs = await db.collection('equipe').find().toArray();
        res.json(docs);
    } catch (err) {
        res.status(500).json({ error: "MongoDB query failed" });
    }
})

app.get('/db/equipes/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    if (!db) {
        return res.status(500).json({ error: "Database not connected yet" });
    }

    try {
        const doc = await db.collection('equipe').findOne({ id: id });

        if (!doc) {
            return res.status(404).json({ error: "Equipe not found" });
        }

        res.status(200).json(doc);

    } catch (err) {
        console.error("MongoDB Error:", err);
        res.status(500).json({ error: "Database query failed" });
    }
})

app.post('/db/equipes', async (req, res) => {
    if (!db) {
        return res.status(500).json({ error: "Database not connected yet" });
    }

    try {
        const equipeData = req.body;
        const result = await db.collection('equipe').insertOne(equipeData);

        res.status(200).json(result);
    } catch (err) {
        console.error("MongoDB Error:", err);
        res.status(500).json({ error: "Database insert failed" });
    }
});

app.put('/db/equipes/:id', async (req, res) => {
    if (!db) {
        return res.status(500).json({ error: "Database not connected yet" });
    }

    try {
        const id = parseInt(req.params.id);
        const replacementEquipe = req.body;

        const result = await db.collection('equipe').replaceOne({ id }, replacementEquipe);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Equipe not found" });
        }

        res.status(200).json(result);
    } catch (err) {
        console.error("MongoDB Error:", err);
        res.status(500).json({ error: "Database update failed" });
    }
});

app.delete('/db/equipes/:id', async (req, res) => {
    if (!db) {
        return res.status(500).json({ error: "Database not connected yet" });
    }

    try {
        const id = parseInt(req.params.id);
        const result = await db.collection('equipe').deleteOne({ id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Equipe not found" });
        }

        res.status(200).json(result);
    } catch (err) {
        console.error("MongoDB Error:", err);
        res.status(500).json({ error: "Database delete failed" });
    }
});
