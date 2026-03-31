let complaints = [];

export default function handler(req, res) {

  // GET
  if (req.method === "GET") {
    return res.json(complaints);
  }

  // POST
  if (req.method === "POST") {
    const data = req.body;
    complaints.push(data);
    return res.json({ msg: "Saved" });
  }

  // PUT
  if (req.method === "PUT") {
    const { id, status } = req.body;
    const item = complaints.find(x => x.id === id);
    if (item) item.status = status;
    return res.json({ msg: "Updated" });
  }

  res.status(405).end();
}
