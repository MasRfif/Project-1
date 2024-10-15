import express, { Request, Response } from "express";
import {
  createPainting,
  getPaintings,
  getPaintingById,
  updatePainting,
  deletePainting,
} from "../controllers/post-controllers";

const router = express.Router();

// Define the routes and map them to controller methods
router.post("/paintings", createPainting); // Create a new painting
router.get("/paintings", getPaintings); // Get all paintings
// router.get("/paintings/:id", getPaintingById); // Get a single painting by ID
router.put("/paintings/:id", updatePainting); // Update a painting by ID
router.delete("/paintings/:id", deletePainting); // Delete a painting by ID

export default router;
