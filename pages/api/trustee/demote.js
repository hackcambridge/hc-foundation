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
      const Committee = Login.collection("Committee");
      const Trustee = Login.collection("Trustee");
      const Admin = Login.collection("Admin");

      const token = authHeader.split(" ")[1];

      if (!token) {
        return res.status(403).json({ error: "Invalid or missing token" });
      }

      const isAdmin = await validateToken({ Role: Admin, token });

      if (!isAdmin) {
        return res.status(403).json({ error: "Invalid or expired token" });
      }

      const email = req.body.email;
      const trustee = await Trustee.findOne({ email });

      if (trustee) {
        await Trustee.deleteOne({ email });
        await Committee.insertOne(trustee);
        res.status(200).json({ message: "Trustee demoted to committee member" });
      } else {
        res.status(404).json({ error: "No trustee found" });
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
