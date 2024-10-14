import getClient from "@/utils/mongodb";

export default async function handler(req, res) {
  const client = await getClient();
  const email = req.body.email;

  try {
    const Login = client.db("Login");
    const User = Login.collection("User");
    const Committee = Login.collection("Committee");
    const Sponsor = Login.collection("Sponsor");
    const Trustee = Login.collection("Trustee");
    const Admin = Login.collection("Admin");

    if (req.method === "POST") {
      const collections = [
        { name: "User", collection: User },
        { name: "Committee", collection: Committee },
        { name: "Sponsor", collection: Sponsor },
        { name: "Trustee", collection: Trustee },
        { name: "Admin", collection: Admin },
      ];

      for (const { name, collection } of collections) {
        const user = await collection.findOne({ email });

        if (user) {
          return res.status(200).json({
            role: name,
            token: user.token,
            user,
          });
        }
      }
      
      res.status(404).json({ error: "User not found" });
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
