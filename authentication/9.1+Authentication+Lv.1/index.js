import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
const app = express();
const port = 3000;

const db = new pg.Client(
  {
    user: "postgres",
    host: "localhost",
    database: "secrets_login",
    password: "1234",
    port: 5432,
  }
)

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [username]);
    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try Logging in");
    }
    else {
      const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [username, password]);
      console.log(result);
      res.render("secrets.ejs");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      username,
    ]);
    if (checkResult.rows.length > 0) {
      if (checkResult.rows[0].password == password) {
        res.render("secrets.ejs");
      } else {
        res.send("Wrong password. Try again.");
      }
    } else {
      res.send("Email does not exist. Try registering.");
    }
  } catch (err) {
    console.log(err);
  }

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
