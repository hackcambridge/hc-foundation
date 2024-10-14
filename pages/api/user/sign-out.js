import fs from "fs";
import { join } from "path";

import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const userId = ObjectId.createFromHexString(req.query.userId);
    const destination = join(process.cwd(), "public", "images", "avatars");

    const findMatchingFile = () => {
      const files = fs.readdirSync(destination);

      return files.find((file) => {
        const fileUserId = file.split(".")[0];

        return fileUserId === userId.toString();
      });
    };

    const matchingFile = findMatchingFile();

    if (matchingFile) {
      const destinationPath = join(destination, matchingFile);

      if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
      }
      fs.unlinkSync(destinationPath);

      res.status(200).json({ message: "File deleted successfully" });
    } else {
      res.status(404).json({ message: "File not found" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
