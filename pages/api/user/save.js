import { ObjectId } from "mongodb";

import getClient from "@/utils/mongodb";

export default async function handler(req, res) {
  const client = await getClient();

  if (req.method === "POST") {
    const userID = ObjectId.createFromHexString(req.body.userID);
    const avatarName = req.body.avatarName;
    const avatarPath = req.body.avatarPath;
    const avatarType = req.body.avatarType;
    const avatarURL = req.body.avatarURL;

    try {
      const Login = client.db("Login");
      const User = Login.collection("User");
      const Admin = Login.collection("Admin");

      const user = await User.findOne({ _id: userID });
      const admin = await Admin.findOne({ _id: userID });

      if (user) {
        await User.updateOne(
          { _id: userID },
          {
            $set: {
              avatar: avatarPath,
              avatarName: avatarName,
              avatarType: avatarType,
              avatarURL: avatarURL,
            },
          },
        );
      } else if (admin) {
        await Admin.updateOne(
          { _id: userID },
          {
            $set: {
              avatar: avatarPath,
              avatarName: avatarName,
              avatarType: avatarType,
              avatarURL: avatarURL,
            },
          },
        );
      }

      res.status(200).json({ message: "Avatar saved successfully" });
    } catch (error) {
      res.status(500).json({ error: "Unable to save the avatar" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
