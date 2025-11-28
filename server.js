require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Cafe = require("./models/cafe");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

app.get("/", (req, res) => {
  res.send("Backend Cafe API Ready");
});

app.get("/api/cafes", async (req, res) => {
  const cafes = await Cafe.find().sort({ createdAt: -1 });
  res.json(cafes);
});

app.post("/api/cafes", async (req, res) => {
  try {
    const { name, description, rating, latitude, longitude } = req.body;

    if (!name || latitude == null || longitude == null)
      return res.status(400).json({ error: "Nama & koordinat wajib" });

    const cafe = await Cafe.create({
      name,
      description,
      rating,
      latitude,
      longitude
    });

    res.status(201).json(cafe);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
