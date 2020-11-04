const express = require("express");
const app= express();
const bodyparser  = require("body-parser");
const jwtLogin = require("jwt-login");
const jwt=require("jsonwebtoken");
const roles = require("user-groups-roles");
const dotenv = require("dotenv").config();
const cookieParser =require('cookie-parser');

app.get('/', (req,res)=>{
  res.send("Hello World")
})

app.listen (3000, (req,res)=>{
  console.log(`server is running on port 3000`);
})
