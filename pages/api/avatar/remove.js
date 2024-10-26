import { S3Client, HeadObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import path from "path";
import fs from "fs";

// Initialize the S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const userId = req.query.userId;
    const fileKey = `avatars/${userId}`;

    try {
      // Check if the file already exists
      await s3Client.send(new HeadObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileKey,
      }));

      // If the file exists, delete it
      await s3Client.send(new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileKey,
      }));

      // Define the path to the public folder
      const publicFolderPath = path.join(process.cwd(), "public", "avatars");

      // Ensure the public/avatars directory exists
      if (!fs.existsSync(publicFolderPath)) {
        fs.mkdirSync(publicFolderPath, { recursive: true });
      }

      // Check if the file exists
      const files = fs.readdirSync(publicFolderPath);
      const matchingFiles = files.filter(file => file.startsWith(userId));

      if (matchingFiles.length === 0) {
        return res.status(500).json({ error: "Error checking for existing file" });
      } else {
        // Delete the matching files
        matchingFiles.forEach(file => {
          fs.unlinkSync(path.join(publicFolderPath, file));
        });
      }

      res.status(200).json({ message: "File deleted" });
    } catch (err) {
      if (err.name !== "NotFound") {
        return res.status(500).json({ error: "Error checking for existing file" });
      }
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
