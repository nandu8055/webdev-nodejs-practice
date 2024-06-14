import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let data = {
  heading: "enter your name"
};
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", data);
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  var name = req.body["fName"] + req.body["lName"];
  console.log(name.length);
  res.render("index.ejs", data = {
    heading: `your name has ${name.length} `
  })
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

