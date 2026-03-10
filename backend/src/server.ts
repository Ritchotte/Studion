import express from "express";

const app = express();
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");

  if (_req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }

  next();
});
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "Studion backend running" });
});

app.post("/scan", (req, res) => {

  const pageData = req.body;

  console.log("Studion received page scan:");
  console.log(pageData);

  res.json({
    status: "scan received",
    received: pageData
  });

});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Studion backend running on port ${PORT}`);
});
