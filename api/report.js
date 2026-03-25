import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(MONGO_URL);
  isConnected = true;
}

const ComplaintSchema = new mongoose.Schema({
  name: String,
  phone: String,
  complaint: String,
});

const Complaint =
  mongoose.models.Complaint ||
  mongoose.model("Complaint", ComplaintSchema);

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const data = await Complaint.create(req.body);
    return res.status(200).json(data);
  }

  if (req.method === "GET") {
    const data = await Complaint.find();
    return res.status(200).json(data);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
