import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

import getClient from "@/utils/mongodb";

export default async function handler(req, res) {
  const client = await getClient();
  const userID = ObjectId.createFromHexString(req.query.userID);
  const role = req.query.role;

  try {
    const Login = client.db("Login");
    const User = Login.collection(role);

    if (req.method === "POST") {
      const { firstName, lastName, email, password } = req.body;

      const user = await User.findOne({ _id: userID });
      let userFirstName = null;
      let userLastName = null;
      let userEmail = null;

      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
      if (firstName === "" || !firstName) {
        userFirstName = user.firstName;
      } else {
        userFirstName = firstName;
      }
      if (lastName === "" || !lastName) {
        userLastName = user.lastName;
      } else {
        userLastName = lastName;
      }
      if (email === "" || !email) {
        userEmail = user.email;
      } else {
        userEmail = email;
      }

      // Compare the password with the encrypted password
      let hashedPassword = null;

      const isUserPasswordMatch =
        user && (await bcrypt.compare(password, user.password));

      if (!isUserPasswordMatch) {
        const saltRounds = 10;

        hashedPassword = await bcrypt.hash(password, saltRounds);
      } else {
        hashedPassword = user?.password;
      }

      // Create a token if the email address is different
      let token = null;

      if (user && email !== user.email) {
        token = jwt.sign({ email }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
      } else {
        token = user?.token;
      }

      await User.updateOne(
        { _id: userID },
        {
          $set: {
            firstName: userFirstName,
            lastName: userLastName,
            email: userEmail,
            password: hashedPassword,
            token,
          },
        },
      );

      res.status(200).json({ message: "User updated successfully" });
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
