const express = require("express");
const app = express();
const port = 3000;
const tf = require("@tensorflow/tfjs");
const fs = require("fs");
require("@tensorflow/tfjs-node");
const cocoSsd = require("@tensorflow-models/coco-ssd");
const { Image, createCanvas } = require("canvas");
app.get("/", (req, res) => res.send("Hello World!"));
const img = fs.readFileSync("./cat.jpg");
console.log(cocoSsd);
// cocoSsd
//   .load()
//   .then(model => model.detect(img))
//   .then(predictions => console.log(predictions));

cocoSsd.load().then(function(model) {
  console.log("model loaded.");

  // feed images
  const width = 300;
  const height = 300;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = () => {
    console.log("image loaded.");

    ctx.drawImage(img, 0, 0, width, height);

    // classify
    model.detect(canvas).then(function(predictions) {
      // Classify the image
      console.log("Predictions: ", predictions);
    });
  };
  img.onerror = err => {
    throw err;
  };
  img.src = "cat.jpg";
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
