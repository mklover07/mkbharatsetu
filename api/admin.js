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
  complaint: String
});

const Complaint = mongoose.models.Complaint || mongoose.model("Complaint", ComplaintSchema);

export default async function handler(req, res) {
  await connectDB();

  const data = await Complaint.find().sort({ _id: -1 });

  res.status(200).json(data);
}
