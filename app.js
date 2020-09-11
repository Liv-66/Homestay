const fs = require("fs");
const express = require("express");

const app = express();
const router = express.Router();
app.use(express.json());

const homepage = fs.readFileSync("./index.html", "utf-8");



router.route("/").get(roomController);

app.use("/homestay/v1/rooms", router);

app.listen(8000, "127.0.0.1", () => {
  console.log("from port: 8000");
});
