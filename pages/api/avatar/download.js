import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
const fs = require("fs");
const path = require("path");

// Initialize the S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    const userId = req.query.userId;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `avatars/${userId}`, // Specify the avatars folder
    };

    try {
      // Fetch the file from S3
      const command = new GetObjectCommand(params);
      const data = await s3Client.send(command);

      // Define the path to the public folder
      const publicFolderPath = path.join(process.cwd(), "public", "avatars");
      
      // Determine the file extension based on the Content-Type
      const contentType = data.ContentType;
      let fileExtension = "";

      switch (contentType) {
        case "image/jpeg":
          fileExtension = ".jpg";
          break;
        case "image/png":
          fileExtension = ".png";
          break;
        case "image/gif":
          fileExtension = ".gif";
          break;
        default:
          fileExtension = ""; // Default to no extension if type is unknown
      }
      
      // Define the file path
      const filePath = path.join(publicFolderPath, `${userId}${fileExtension}`);

      // Ensure the public/avatars directory exists
      if (!fs.existsSync(publicFolderPath)) {
        fs.mkdirSync(publicFolderPath, { recursive: true });
      }

      // Create a write stream to the file
      const fileStream = fs.createWriteStream(filePath);
      
      // Pipe the S3 data to the file
      data.Body.pipe(fileStream);

      // When the file is fully written, send a response
      fileStream.on("finish", () => {
        return res.status(200).json({
          message: "File downloaded successfully",
          path: `/avatars/${userId}${fileExtension}`
        });
      });

      // Handle errors
      fileStream.on("error", (err) => {
        return res.status(500).json({
          error: "Error writing the file",
          details: err.message
        });
      });
    } catch (err) {
      return res.status(500).json({ error: "Error fetching the file" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
