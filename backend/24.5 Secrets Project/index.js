//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app=express();
const port = 3000;
var password="ILoveProgramming";
var toggle="false";
app.use(bodyParser.urlencoded({extended:true}));
function passwordChecker(req,res,next){
    console.log(req.body);
    const typedPassword = req.body["password"];
    if(typedPassword==password){
        toggle="true";
    }
    else{
        toggle="false";
    }
    next();
  }
  app.use(passwordChecker);

  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });

  app.post("/check",(req,res)=>{
    console.log(req.body);
    if(toggle=="true"){
        res.sendFile(__dirname + "/public/secret.html");
    }
    else{
        res.redirect("/");
    }
  });


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  