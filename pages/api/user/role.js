import getClient from "@/utils/mongodb";

export default async function handler(req, res) {
  const client = await getClient();
  const email = req.query.email;

  try {
    const Login = client.db("Login");
    const User = Login.collection("User");
    const Committee = Login.collection("Committee");
    const Sponsor = Login.collection("Sponsor");
    const Trustee = Login.collection("Trustee");
    const Admin = Login.collection("Admin");

    if (req.method === "GET") {
      const user = await User.findOne({ email });
      const committee = await Committee.findOne({ email });
      const sponsor = await Sponsor.findOne({ email });
      const trustee = await Trustee.findOne({ email });
      const admin = await Admin.findOne({ email });

      if (user) {
        res.status(200).json({ role: "User" });
      } else if (committee) {
        res.status(200).json({ role: "Committee" });
      } else if (sponsor) {
        res.status(200).json({ role: "Sponsor" });
      } else if (trustee) {
        res.status(200).json({ role: "Trustee" });
      } else if (admin) {
        res.status(200).json({ role: "Admin" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Unable to retrieve data from the database" });
  }
}
