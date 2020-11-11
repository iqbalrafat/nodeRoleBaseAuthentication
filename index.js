const express = require("express");
const app= express();
const bodyparser  = require("body-parser");
const jwtLogin = require("jwt-login");
const jwt=require("jsonwebtoken");
const roles = require("user-groups-roles");
const dotenv = require("dotenv").config();
const cookieParser =require('cookie-parser');

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
roles.addPrivilegeToRole("editor",["/article","POST"],"Insert Article",true);
roles.addPrivilegeToRole("editor",["/article","PUT"],"Edit Article",true);

//Privileges assign to author
roles.addPrivilegeToRole("author",["/article","POST"],"Insert Article",true);

//Privileges assign to subscriber
roles.addPrivilegeToRole("subscriber",["/article","GET"],"Read article",true); // we don't need to define. just for clarification

//Defining render pages
app.get("/login",(res,req)=>{
  res.send(__dirname + "html/login.html");
});
app.post("/post", (res,req)=>{
  res.send(__dirname + "html/post.html");
});
app.put("/put", (res,req)=>{
  res.send(__dirname + "/html/put.html");
});
app.delete("/delete",(res,req)=>{
  res.send(__dirname + "html/delete.html");
});




app.get('/', (req,res)=>{
  res.send("Hello World")
})

app.listen (3000, (req,res)=>{
  console.log(`server is running on port 3000`);
})
