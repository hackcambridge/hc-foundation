import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import getClient from "@/utils/mongodb";
import { loginMethods } from "@/utils/login";

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
      const { firstName, lastName, email, password } = req.body;

      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: "Please fill in all fields" });
      }

      // Encrypt the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create a token
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Define type of sign-up
      const type = "credentials";
      const type_index = loginMethods[type];

      // Define avatar and notifications
      const avatar = "";
      const avatarName = "";
      const avatarType = "";
      const avatarURL = "";
      const notifications = 0;

      // Check if the user already exists
      const user = await User.findOne({ email });
      const committee = await Committee.findOne({ email });
      const sponsor = await Sponsor.findOne({ email });
      const trustee = await Trustee.findOne({ email });
      const admin = await Admin.findOne({ email });

      // If the user already exists, return an error
      if (user || committee || sponsor || trustee || admin) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Save the encrypted password and token into the appropriate collection
      const userData = {
        avatar,
        avatarName,
        avatarType,
        avatarURL,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        token,
        notifications,
        type,
        type_index,
      };

      const isCommittee = email.endsWith("@hackcambridge.com");

      if (isCommittee) {
        await Committee.insertOne(userData);
      } else {
        await User.insertOne(userData);
      }
      res.status(200).json({ 
        message: "User created successfully",
        role: isCommittee ? "Committee" : "User", 
        token,
        user: userData,
      });
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to upload data to the database" });
  }
}
