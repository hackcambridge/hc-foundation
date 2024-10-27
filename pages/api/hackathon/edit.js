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

      const isCommittee = await validateToken({ Role: Committee, token });
      const isTrustee = await validateToken({ Role: Trustee, token });
      const isAdmin = await validateToken({ Role: Admin, token });

      if (!isCommittee && !isTrustee && !isAdmin) {
        return res.status(403).json({ error: "Invalid or expired token" });
      }

      const General = client.db("General");
      const Hackathon = General.collection("Hackathon");

      const updatedHackathon = req.body;

      if (!updatedHackathon || Object.keys(updatedHackathon).length === 0) {
        return res.status(400).json({ error: "Hackathon data is missing" });
      }

      const year = req.query.year;
      const result = await Hackathon.updateOne({
        year: parseInt(year),
      }, {
        $set: updatedHackathon,
      });

      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Hackathon updated successfully" });
      } else {
        res.status(404).json({ error: "Hackathon not found" });
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
