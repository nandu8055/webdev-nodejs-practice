import express from "express";
import bodyParser from "body-parser";
import pg from "pg";


const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "1234",
  port: 5432
});
db.connect();




app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  //Write your code here.
  res.render("index.ejs", { countries: countries, total: countries.length });
});
app.post("/add", async (req, res) => {
  const country_name = req.body.country;

  country_code = await db.query(`SELECT flag FROM flags WHERE LOWER(name) iLIKE LOWER(${country_name})`);
  console.log(country_code);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
