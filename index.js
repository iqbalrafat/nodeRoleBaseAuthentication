const express = require("express");
const app= express();
const bodyparser  = require("body-parser");
const jwtLogin = require("jwt-login");
const jwt=require("jsonwebtoken");
const roles = require("user-groups-roles");
const dotenv = require("dotenv").config();
const cookieParser =require('cookie-parser');
const httpMsgs=require("http-msgs");
const crypto= require("crypto-js");

app.use(bodyparser.urlencoded({extended:false}));

// Created Roles
roles.createNewRole("admin");
roles.createNewRole("editor");
roles.createNewRole("author");
roles.createNewRole("subscriber");

//Create the privileges
roles.createNewPrivileges(["/article","GET"], "get article", true),
roles.createNewPrivileges(["/article", "POST"], "insert article", false);
roles.createNewPrivileges(["/article","PUT"], "edit/update articles", false);
roles.createNewPrivileges(["/article","DELETE"], "Delete data", false);

//Assign privileges to roles. If some privileges are not assign then role will take the default privileges.
roles.addPrivilegeToRole("admin",["/article","POST"], "Insert article", true);
roles.addPrivilegeToRole("admin",["/article","PUT"], "Edit article", true);
roles.addPrivilegeToRole("admin",["/article", "DELETE"], "Delete article", true);
//Privileges assign to Editor
roles.addPrivilegeToRole("editor",["/article","post"],"Insert Article",true);
roles.addPrivilegeToRole("editor",["/article","PUT"],"Edit Article",true);

//Privileges assign to author
roles.addPrivilegeToRole("author",["/article","post"],"Insert Article",true);

//Privileges assign to subscriber
roles.addPrivilegeToRole("subscriber",["/article","GET"],"Read article",true); // we don't need to define. just for clarification

//Defining render pages
app.get("/login",(req,res)=>{
  res.sendFile(__dirname + "/html/login.html");
});
app.get("/post", (req,res)=>{
  res.sendFile(__dirname + "/html/post.html");
});
app.get("/put", (req,res)=>{
  res.sendFile(__dirname + "/html/put.html");
});
app.get("/delete",(req,res)=>{
  res.sendFile(__dirname + "/html/delete.html");
});


//Login
app.post("/login",(req,res)=>{
  let user=req.body.user;
  let password=req.body.password;
  // to mimic database we are comparing user with password. in database it will be user
  if (user==password){
    jwtLogin.sign(req,res,user,"topsecret",1,false)
  }
  else{
    res.status(500).send("invalid user")
  }
});
//logout
app.get("/logout",(req,res)=>{
  jwtLogin.signout(req,res,false);
});
//middleware
let valid_login=function(req,res,next){
  try{
      req.jwt=jwtLogin.validate_login(req,res);
      next();
  }
  catch(error){
    httpMsgs.send500(req,res,error);
  }
 
}
//making a secure route for article.
app.get("/article",valid_login,(req,res)=>{
  res.send("hello world");
});




app.get('/', (req,res)=>{
  res.send("Hello World")
})

app.listen (3000, (req,res)=>{
  console.log(`server is running on port 3000`);
})
