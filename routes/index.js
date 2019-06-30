//express
const app = (module.exports = require("express")());
const fs = require("fs");
//multer for files
const multer = require("multer");
var upload = multer({ dest: "upload/" }).single("image");

//tensor flow imports
const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node");
const cocoSsd = require("@tensorflow-models/coco-ssd");

//canvas imports
const { Image, createCanvas } = require("canvas");
const width = 300;
const height = 300;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");
const img = new Image();

//default path to render react webpage
app.get("/", (req, res) => res.redirect("/index.html"));

cocoSsd
  .load()
  .then(function(model) {
    //will handle the post request for images
    app.post("/getPrediction", (req, res) => {
      upload(req, res, function(err) {
        if (err) {
          console.error(
            "Error while retrieving image from request(multer)",
            err
          );
          return res.end("Something went wrong!");
        }
        // feed images
        img.onload = () => {
          console.log("image loaded.");

          console.log(img);

          //draw the image on the canvas
          ctx.drawImage(img, 0, 0, width, height);

          // detect the objects
          model.detect(canvas).then(function(predictions) {
            console.log("Predictions: ", predictions);
            //need to delete files from uploads folder once
            //computation is done
            fs.unlink(req.file.destination + req.file.filename, () => {
              console.log(
                req.file.destination + req.file.filename + " deleted"
              );
            });

            //send the prediction response along with height and width
            res.status(200).send({
              height: img.height,
              width: img.width,
              predictions: predictions
            });
          });
        };

        console.log(
          "Loading image from " + req.file.destination + req.file.filename
        );

        //set image path to the path in uploads
        img.src = req.file.destination + req.file.filename;

        img.onerror = err => {
          throw err;
        };
      });
    });
  })
  .catch(err => res.status(400).send(error));
