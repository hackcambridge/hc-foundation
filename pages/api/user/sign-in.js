import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import getClient from "@/utils/mongodb";

export default async function handler(req, res) {
  const client = await getClient();

  try {
    const Login = client.db("Login");
    const User = Login.collection("User");
    const Committee = Login.collection("Committee");
    const Sponsor = Login.collection("Sponsor");
    const Trustee = Login.collection("Trustee");
    const Admin = Login.collection("Admin");

    if (req.method === "POST") {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: "Please fill in all fields" });
      }

      // If the user exists, check the password
      const collections = [
        { name: "User", collection: User },
        { name: "Committee", collection: Committee },
        { name: "Sponsor", collection: Sponsor },
        { name: "Trustee", collection: Trustee },
        { name: "Admin", collection: Admin },
      ];

      let user = null;
      let role = null;

      for (const { name, collection } of collections) {
        user = await collection.findOne({ email });
        if (user) {
          role = name;
          break;
        }
      }

      if (user) {
        const match = await bcrypt.compare(password, user.password);

        if (match) {
          // Create a token
          const token = jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });

          // Update the token in the database
          await collections.find(c => c.name === role).collection.updateOne({ email }, { $set: { token } });

          // Retrieve the updated user details
          const updatedUser = await collections.find(c => c.name === role).collection.findOne({ email });

          return res.status(200).json({ token, role, user: updatedUser });
        } else {
          return res.status(400).json({ error: "Invalid password" });
        }
      } else {
        return res.status(400).json({ error: "User not found" });
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
