import clientPromise from "../lib/db";

export default async function handler(req, res) {
const { u, p } = JSON.parse(req.body);

const client = await clientPromise;
const db = client.db("mkdb");

const user = await db.collection("users").findOne({ username: u, password: p });

if (user) {
res.json({ success: true });
} else {
res.json({ success: false });
}
}
