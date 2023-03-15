import path from "path";
import fs from "fs";
import express from "express";

const app = express();

app.use(express.static(path.join(process.cwd(), "src", "assets")));

app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "src", "view", "index.html"));
});

app.listen(8000, () => {
  console.log("server already set up");
});
