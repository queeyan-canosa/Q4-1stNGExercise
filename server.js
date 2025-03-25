// Loads the express module
const express = require("express");
const hbs = require("hbs");

const bodyParser = require("body-parser");

const path = require("path");

//Creates our express server
const app = express();
const port = 3000;

//Serves static files (we need it to import a css file)
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));

//Sets a basic route

// Render the initial page with the number input form
app.get("/", (req, res) => {
  res.render("index", { sideA: null, sideB: null, hypotenuse: null });
});

// Create express route binder for draw.hbs and get the data from the url as parameters
app.post("/draw", (req, res) => {
  const { sideA, sideB } = req.body;

  // Validate input and convert to numbers
  const sideANum = parseFloat(sideA);
  const sideBNum = parseFloat(sideB);

  if (isNaN(sideANum) || isNaN(sideBNum) || sideANum <= 0 || sideBNum <= 0) {
    return res.render("index", {
      error: "Please enter positive numbers for the sides.",
      sideA,
      sideB,
    });
  } 
  // Calculate the hypotenuse
  const hypotenuse = Math.sqrt(Math.pow(sideANum, 2) + Math.pow(sideBNum, 2)).toFixed(2);

  // Render the draw.hbs page with the calculated data
  res.render("draw", {
    sideA: sideANum,
    sideB: sideBNum,
    hypotenuse,
  });
});

app.get("/draw", (req, res) => {
  res.render("draw", { sideA: null, sideB: null, hypotenuse: null });
});

  
//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`));
