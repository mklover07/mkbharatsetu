export default function handler(req, res) {
  const { username, password } = req.body;

  // Hardcoded credentials (later DB में डालेंगे)
  const ADMIN_USER = "admin";
  const ADMIN_PASS = "123456";

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.status(200).json({
      success: true,
      token: "mkbharat-token-123"
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }
}
