import getClient from "@/utils/mongodb";
import { validateToken } from "@/utils/login";

export default async function handler(req, res) {
  const client = await getClient();

  try {
    if (req.method === "POST") {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({ error: "Authorization header missing" });
      }

      const Login = client.db("Login");
      const User = Login.collection("User");
      const Sponsor = Login.collection("Sponsor");

      const token = authHeader.split(" ")[1];

      if (!token) {
        return res.status(403).json({ error: "Invalid or missing token" });
      }

      const isUser = await validateToken({ Role: User, token });

      if (!isUser) {
        return res.status(403).json({ error: "Invalid or expired token" });
      }

      const email = req.body.email;
      const user = await User.findOne({ email });

      if (user) {
        await User.deleteOne({ email });
        await Sponsor.insertOne(user);
        res.status(200).json({ message: "User registered as sponsor" });
      } else {
        res.status(404).json({ error: "No user found" });
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Unable to retrieve data from the database" });
  }
}