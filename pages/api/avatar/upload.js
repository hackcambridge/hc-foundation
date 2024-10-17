import { S3Client, HeadObjectCommand, DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import path from "path";
import fs from "fs"; // Import fs to read file from disk

// Initialize the S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

let userId = "";

// Configure multer for disk storage
const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(process.cwd(), "public", "avatars"), // Save files in images/avatars
    filename: (req, file, cb) => {
      const fileExtension = file.originalname.split(".").pop();
      cb(null, userId + "." + fileExtension); // Name file by userId
    },
  }),
});

// Disable bodyParser to handle multipart form data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    userId = req.query.userId;

    let file;

    // Use multer to handle file upload
    await new Promise((resolve, reject) => {
      upload.single("file")(req, res, (err) => {
      if (err) {
        reject(err);
      } else {
        file = req.file; // Get the uploaded file
        resolve();
      }
      });
    });

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    } else if (file.size > 1048576) {
      return res.status(400).json({ error: "File size too large" });
    } else if (!file.mimetype.startsWith("image/")) {
      return res.status(400).json({ error: "File is not an image" });
    }
    
    const filePath = file.path; // Get path to the file stored locally
    const fileKey = `avatars/${userId}`; // Define file path in avatars folder

    try {
      // Check if the file already exists in S3
      await s3Client.send(new HeadObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileKey,
      }));

      // If the file exists, delete it
      await s3Client.send(new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileKey,
      }));

      // console.log("Old file deleted successfully.");
    } catch (err) {
      if (err.name !== "NotFound") {
        // console.log("No existing file found.");
      }
    }

    // Upload the new file
    try {
      const fileStream = fs.readFileSync(filePath); // Create a file stream from the uploaded file

      const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileKey,
        Body: fileStream,
        ContentType: file.mimetype,
      };

      const input = new PutObjectCommand(uploadParams);
      const data = await s3Client.send(input);

      // Clean up local file after upload
      fs.unlinkSync(filePath);

      return res.status(200).json({
        message: "File uploaded successfully",
        url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`,
        response: data,
      });
    } catch (uploadError) {
      return res.status(500).json({ error: uploadError.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
