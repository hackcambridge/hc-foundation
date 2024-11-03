import getClient from "@/utils/mongodb";
import { validateToken } from "@/utils/login";

export default async function handler(req, res) {
  const client = await getClient();

  try {
    if (req.method === "GET") {
      const Login = client.db("Login")
      const Trustee = Login.collection("Trustee");

      const trustees = await Trustee
        .find({}, { projection: {
          firstName: 1,
          lastName: 1,
          email: 1,
          phone: 1,
          title: 1,
          bio: 1,
          avatar: 1
        } })
        .sort({ firstName: 1, lastName: 1 })
        .toArray();

      if (trustees.length > 0) {
        res.status(200).json(trustees);
      } else {
        res.status(404).json({ error: "No trustees found" });
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
