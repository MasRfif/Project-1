import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new painting
export const createPainting = async (req: Request, res: Response) => {
  const { name, thumbnail, description, price, imageUrl } = req.body;

  try {
    const newPainting = await prisma.painting.create({
      data: {
        name,
        thumbnail,
        description,
        price: parseFloat(price),
        imageUrl,
      },
    });
    res.status(201).json(newPainting);
  } catch (error) {
    console.error("Error creating painting:", error);
    res.status(500).json({ error: "Error creating painting" });
  }
};

// Get all paintings
export const getPaintings = async (_req: Request, res: Response) => {
  try {
    const paintings = await prisma.painting.findMany();
    res.status(200).json(paintings);
  } catch (error) {
    console.error("Error fetching paintings:", error);
    res.status(500).json({ error: "Error fetching paintings" });
  }
};

export const getPaintingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const painting = await prisma.painting.findUnique({
      where: { id: Number(id) },
    });

    if (painting) {
      return res.status(404).json({ error: "Painting not found" });
    }
    return res.status(200).json(painting);
  } catch (error) {
    console.error("Error fetching painting:", error);
    return res.status(500).json({ error: "Error fetching painting" });
  }
};

// Update a painting by ID
export const updatePainting = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, thumbnail, description, price, imageUrl } = req.body;

  try {
    const updatedPainting = await prisma.painting.update({
      where: { id: Number(id) },
      data: {
        name,
        thumbnail,
        description,
        price: parseFloat(price),
        imageUrl,
      },
    });

    res.status(200).json(updatedPainting);
  } catch (error) {
    console.error("Error updating painting:", error);
    res.status(500).json({ error: "Error updating painting" });
  }
};

// Delete a painting by ID
export const deletePainting = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedPainting = await prisma.painting.delete({
      where: { id: Number(id) },
    });

    res.status(200).json(deletedPainting);
  } catch (error) {
    console.error("Error deleting painting:", error);
    res.status(500).json({ error: "Error deleting painting" });
  }
};
