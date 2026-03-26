let data = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { name, phone, complaint } = req.body;

    const newItem = {
      id: Date.now(),
      name,
      phone,
      complaint,
      status: "Pending"
    };

    data.push(newItem);
    return res.status(200).json({ success: true });
  }

  if (req.method === "GET") {
    return res.status(200).json(data);
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    data = data.filter(item => item.id != id);
    return res.status(200).json({ success: true });
  }

  if (req.method === "PUT") {
    const { id, status } = req.body;

    data = data.map(item =>
      item.id == id ? { ...item, status } : item
    );

    return res.status(200).json({ success: true });
  }
}
