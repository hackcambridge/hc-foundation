import getClient from "@/utils/mongodb";
import { validateToken } from "@/utils/login";

export default async function handler(req, res) {
  const client = await getClient();

  try {
    if (req.method === "GET") {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({ error: "Authorization header missing" });
      }

      const Login = client.db("Login");
      const User = Login.collection("User");
      const Hacker = Login.collection("Hacker");
      const Committee = Login.collection("Committee");
      const Sponsor = Login.collection("Sponsor");
      const Trustee = Login.collection("Trustee");
      const Admin = Login.collection("Admin");

      const token = authHeader.split(" ")[1];

      if (!token) {
        return res.status(403).json({ error: "Invalid or missing token" });
      }

      const isHacker = await validateToken({ Role: Hacker, token });
      const isCommittee = await validateToken({ Role: Committee, token });
      const isSponsor = await validateToken({ Role: Sponsor, token });
      const isTrustee = await validateToken({ Role: Trustee, token });
      const isAdmin = await validateToken({ Role: Admin, token });

      if (!isHacker && !isCommittee && !isSponsor && !isTrustee && !isAdmin) {
        return res.status(403).json({ error: "Invalid or expired token" });
      }

      const hackers = await Hacker.find()
        .sort({ firstName: 1, lastName: 1 })
        .toArray();

      if (hackers.length > 0) {
        res.status(200).json(hackers);
      } else {
        res.status(404).json({ error: "No hackers found" });
      }
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Unable to retrieve data from the database" });
  }
}
