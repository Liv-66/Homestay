const fs = require("fs");
const express = require("express");

const app = express();

const data = fs.readFileSync(`${__dirname}/index.html`, "utf-8");
const css = fs.readFileSync(`${__dirname}/style.css`, "utf-8");

const router = express.Router();

const handler = (req, res) => {
  res.end(data);
};

router.get("/", handler);

app.use("/homestay/v1/rooms", router);

app.listen(8000, "127.0.0.1", () => {
  console.log("from port 8000");
});
