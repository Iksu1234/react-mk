const { json } = require("body-parser");
const express = require("express");
const fs = require("fs");
const { type } = require("os");
const path = require("path");
const router = express.Router();

// GET images from images.json
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

// GET ratings from rating.json
router.get("/ratings", (req, res) => {
  const filePath = path.join(__dirname, "../rating.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading rating.json:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const ratings = JSON.parse(data);
    res.json(ratings);
  });
});

// POST ratings to rating.json
router.post("/ratings", (req, res) => {
  const filePath = path.join(__dirname, "../rating.json");
  const newRate = req.body;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading rating.json:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    let oldRate = JSON.parse(data);

    for (let i = 0; i < oldRate.length; i++) {
      oldRate[i].push(newRate[i]);
    }

    fs.writeFile(filePath, JSON.stringify(oldRate), "utf8", (err) => {
      if (err) {
        console.error("Error writing file", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.status(201).send("Rating added successfully");
    });
  });
});
// POST new images to images.json
router.post("/images", (req, res) => {
  const filePath = path.join(__dirname, "../images.json");
  const newImages = req.body;
  console.log(newImages);

  fs.writeFile(filePath, JSON.stringify(newImages), "utf8", (err) => {
    if (err) {
      console.error("Error writing file", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.status(201).send("New image file created");
  });
});

module.exports = router;
