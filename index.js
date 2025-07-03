const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/hash", async (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: "No password" });
  const hash = await bcrypt.hash(password, 10);
  res.json({ hash });
});

app.post("/compare", async (req, res) => {
  const { password, hash } = req.body;
  if (!password || !hash) return res.status(400).json({ error: "Missing fields" });
  const valid = await bcrypt.compare(password, hash);
  res.json({ valid });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));