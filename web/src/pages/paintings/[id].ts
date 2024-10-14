import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const painting = await prisma.painting.findUnique({
        where: { id: Number(id) },
      });
      return res.status(200).json(painting);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching painting" });
    }
  } else if (req.method === "PUT") {
    const { name, thumbnail, description, price, imageUrl } = req.body;
    try {
      const updatedPainting = await prisma.painting.update({
        where: { id: Number(id) },
        data: {
          name,
          thumbnail,
          description,
          price,
          imageUrl,
        },
      });
      return res.status(200).json(updatedPainting);
    } catch (error) {
      return res.status(500).json({ error: "Error updating painting" });
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedPainting = await prisma.painting.delete({
        where: { id: Number(id) },
      });
      return res.status(200).json(deletedPainting);
    } catch (error) {
      return res.status(500).json({ error: "Error deleting painting" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
