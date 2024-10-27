import getClient from "@/utils/mongodb";

export default async function handler(req, res) {
  const client = await getClient();

  try {
    if (req.method === "GET") {
      const General = client.db("General");
      const Hackathon = General.collection("Hackathon");

      const hackathons = await Hackathon
        .find({}, { projection: {
          year: 1,
          name: 1,
          shortName: 1,
          logoLight: 1,
          logoDark: 1,
          website: 1
        } })
        .sort({ year: -1 })
        .toArray();

      if (hackathons.length > 0) {
        res.status(200).json(hackathons);
      } else {
        res.status(404).json({ error: "No hackathons found" });
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
