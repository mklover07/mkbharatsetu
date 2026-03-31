import { MongoClient } from "mongodb";

let client;

export default async function handler(req, res) {

  if (!client) {
    client = new MongoClient(process.env.MONGO_URL);
    await client.connect();
  }

  const db = client.db("mkbharat");
  const col = db.collection("complaints");

  // GET all
  if (req.method === "GET") {
    const data = await col.find().toArray();
    return res.json(data);
  }

  // POST (add complaint)
  if (req.method === "POST") {
    await col.insertOne(req.body);
    return res.json({ msg: "Saved" });
  }

  // PUT (update status)
  if (req.method === "PUT") {
    const { id, status } = req.body;

    await col.updateOne({ id }, { $set: { status } });

    return res.json({ msg: "Updated" });
  }

  // DELETE
  if (req.method === "DELETE") {
    const { id } = req.body;

    await col.deleteOne({ id });

    return res.json({ msg: "Deleted" });
  }

  res.status(405).end();
}
