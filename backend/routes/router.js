const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.get("/images", (req, res) => {
  const filePath = path.join(__dirname, "../images.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading images.json:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const images = JSON.parse(data);
    res.json(images);
  });
});

module.exports = router;
