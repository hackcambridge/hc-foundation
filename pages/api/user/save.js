import { ObjectId } from "mongodb";

import getClient from "@/utils/mongodb";

export default async function handler(req, res) {
  const client = await getClient();

  if (req.method === "POST") {
    const userID = ObjectId.createFromHexString(req.body.userID);
    const role = req.body.role;
    const avatarName = req.body.avatarName;
    const avatarPath = req.body.avatarPath;
    const avatarType = req.body.avatarType;
    const avatarURL = req.body.avatarURL;

    try {
      const Login = client.db("Login");
      const Collection = Login.collection(role);

      const collection = await Collection.findOne({ _id: userID });

      if (!collection) {
        return res.status(404).json({ error: "User not found" });
      }
      
      await Collection.updateOne(
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

      res.status(200).json({ message: "Avatar saved successfully" });
    } catch (error) {
      res.status(500).json({ error: "Unable to save the avatar" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
