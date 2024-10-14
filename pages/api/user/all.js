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
      const Admin = Login.collection("Admin");

      const token = authHeader.split(" ")[1];

      if (!token) {
        return res.status(403).json({ error: "Invalid or missing token" });
      }
      if (!(await validateToken({ Admin, token }))) {
        return res.status(403).json({ error: "Invalid or expired token" });
      }

      const users = await User.find()
        .sort({ firstName: 1, lastName: 1 })
        .toArray();
      const admins = await Admin.find()
        .sort({ firstName: 1, lastName: 1 })
        .toArray();

      if (users.length > 0 || admins.length > 0) {
        res.status(200).json({
          users,
          admins,
        });
      } else {
        res.status(404).json({ error: "No users or admins found" });
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
