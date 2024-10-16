import express from "express";
import paintingRoutes from "./routes/post-routes";
import cors from "cors";

const app = express();

// Use CORS middleware before routes
app.use(
  cors({
    origin: "gallery-beige-ten.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.json()); // Middleware for parsing JSON bodies

// Use painting routes
app.use("/api", paintingRoutes);

// Start the server
app.listen(() => {
  console.log(`Server is running`);
});
