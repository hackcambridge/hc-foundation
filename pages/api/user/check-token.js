import jwt from "jsonwebtoken";

export default function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({ valid: false, message: "Token is required" });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        return res.status(200).json({ valid: true, message: "Token is valid", decoded });
      } catch (error) {
        return res.status(401).json({ valid: false, message: "Token is invalid or expired" });
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    return res.status(500).json({ valid: false, message: "Unable to verify token" });
  }
}