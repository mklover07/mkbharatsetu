import { MongoClient } from "mongodb";

let client;

export default async function handler(req, res) {

  if (!client) {
    client = new MongoClient(process.env.MONGO_URL);
    await client.connect();
  }

  const db = client.db("mkbharat");
  const col = db.collection("complaints");

  // SAVE DATA
  if (req.method === "POST") {
    const data = req.body;

    await col.insertOne(data);

    return res.status(200).json({ message: "Saved" });
  }

  // GET DATA
  if (req.method === "GET") {
    const data = await col.find().toArray();
    return res.status(200).json(data);
  }

  res.status(405).json({ message: "Method not allowed" });
}
