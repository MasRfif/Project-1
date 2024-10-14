import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, thumbnail, description, price, imageUrl } = req.body;
    try {
      const newPainting = await prisma.painting.create({
        data: {
          name,
          thumbnail,
          description,
          price,
          imageUrl,
        },
      });
      return res.status(201).json(newPainting);
    } catch (error) {
      return res.status(500).json({ error: "Error creating painting" });
    }
  } else if (req.method === "GET") {
    try {
      const paintings = await prisma.painting.findMany();
      return res.status(200).json(paintings);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching paintings" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
