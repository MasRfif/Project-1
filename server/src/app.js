const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/paintings", async (req, res) => {
  const { name, thumbnail, description, price, imageUrl } = req.body;

  try {
    const newPainting = await prisma.painting.create({
      data: { name, thumbnail, description, price, imageUrl },
    });
    res.status(201).json(newPainting);
  } catch (error) {
    res.status(500).json({ error: "Error creating painting" });
  }
});

app.get("/paintings/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the painting by ID
    const painting = await prisma.painting.findUnique({
      where: { id: parseInt(id) }, // Prisma expects the ID to be an integer
    });

    if (!painting) {
      return res.status(404).json({ error: "Painting not found" });
    }

    res.json(painting);
  } catch (error) {
    res.status(500).json({ error: "Error fetching painting" });
  }
});

// app.get("/paintings", async (req, res) => {
//   try {
//     const paintings = await prisma.painting.findMany();
//     res.json(paintings);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch paintings" });
//   }
// });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API server is running on http://localhost:${PORT}`);
});
