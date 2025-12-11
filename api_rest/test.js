const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://mahdilabidi_db_user:mest855@bdmonapi.zeqldbr.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function test() {
    try {
        console.log("Connecting...");
        await client.connect();
        console.log("CONNECTED ✔");

        const dbs = await client.db().admin().listDatabases();
        console.log("Databases:", dbs);

    } catch (e) {
        console.error("Error:", e);
    } finally {
        await client.close();
    }
}

test();
