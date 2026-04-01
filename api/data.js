import { MongoClient } from "mongodb";

let client;

export default async function handler(req, res) {

  try {

    if (!client) {
      client = new MongoClient(process.env.MONGO_URL);
      await client.connect();
    }

    const db = client.db("mkbharat");
    const col = db.collection("complaints");

    // GET
    if (req.method === "GET") {
      const data = await col.find().toArray();
      return res.json(data);
    }

    // POST
    if (req.method === "POST") {
      await col.insertOne(req.body);
      return res.json({ msg: "saved" });
    }

    // PUT
    if (req.method === "PUT") {
      const { id, status } = req.body;
      await col.updateOne({ id }, { $set: { status } });
      return res.json({ msg: "updated" });
    }

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
