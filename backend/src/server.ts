import express from "express";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "Studion backend running" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Studion backend running on port ${PORT}`);
});
