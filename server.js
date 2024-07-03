// import express from 'express'
const express = require("express");
const path = require("path");
const { EventEmitter } = require("events");
const fs = require("fs");
const upload = require("./middleware/fileUpload.middleware");
const os = require("os");
const bodyParser = require("body-parser");
const server = new express();
const jwt = require("jsonwebtoken");
const { error } = require("console");
const jwtAuthentication = require("./middleware/auth");


//loading dotenv module, .config() method will loads all the variables from .env files into process object and process object is globle object.
require("dotenv").config();
//accessing port from process object.
const port = process.env.PORT;

// server.use(bodyParser.json());
server.use(express.json());
server.use(express.urlencoded());





server.get("/test", (req, res) => {

  console.log(req.params);
  // console.log('object');
  // console.log(req.body);
  res.send("Welcome");
});

//...........................refresh token..............................

const refreshTokenArray= [];
server.post("/login", (req, res) => {
  //  const {email, password}= req.body;
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  //check the user in database, if the user present then only do further, otherwise return unothorized.
  const accessToken = generateAccessToken({email: user.email});
  const refreshToken = generateRefreshToken({email: user.email});
  refreshTokenArray.push(refreshToken);
  res.json({
    message: "Login Successful",
    "Access Token": accessToken,
    "Refresh Token": refreshToken,
  });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
}
function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '15d'});
}


server.post('/refreshToken', (req, res)=>{
  console.log( req.body.refreshToken);
  const refreshToken= req.body.refreshToken;
  if(!refreshToken){
    return res.status(400).json({"message":"Refresh Token Not Present"});
  }
   console.log(refreshTokenArray[0]);
  if(!refreshTokenArray.includes(refreshToken)){
    return res.status(400).json({"message":"Invalid User"});        
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user)=>{
    if(error){
     return res.status(400).json({"message": "token Invalid"});
    }

    const accessToken= generateAccessToken({email: user.email});
    res.status(200).json({"message":"Token Refreshed", 'Access Token': accessToken});
  })
});

//protectd route.
server.get('/protected', jwtAuthentication, (req, res)=>{
  res.status(200).json({"message":"This is protected route"});
})

//.............................End refresh token............................

//creating properties and fetching...........................

// server.set('port', 9000);
// const port= server.get('port');

//event in nodejs............................................
// const eventEmitter = new EventEmitter();

// // Define a custom event named 'userLoggedIn'
// eventEmitter.on("userLoggedIn", (username) => {
//   console.log(`User ${username} logged in!`);
// });

// // Route handler for the '/login' route
// server.get("/login", (req, res) => {
//   // Emit the 'userLoggedIn' event with the username 'JohnDoe'
//   eventEmitter.emit("userLoggedIn", "JohnDoe");
//   res.send("Login successful!");
// });

//sending static file...............................................
server.get("/index", (req, res) => {
  // console.log("hloooo");
  // console.log(__dirname);
  // console.log(__filename);
  // console.log(path.join(__dirname, "./public/index.html"));
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//using fs module...................................................

// fs.writeFileSync('./public/info.txt', 'Hi there, how are you?');

// fs.writeFile('./public/info.txt', "hlo, how are you?", ()=>{});

// let data= fs.readFileSync('./public/info.txt', 'utf-8');
// // console.log(data.toString());
// console.log(data);

// fs.readFile('./public/info.txt', 'utf-8', (err, data)=>{
// console.log(data);
// })

// fs.appendFileSync('./public/info.txt', 'i am good\n');

// fs.appendFile('./public/info.txt', 'what about you?\n', ()=>{});

//Streams...................................................................

// server.get("/checkstream", (req, res) => {
//   //create readstream
//   const readableStream = fs.createReadStream("./public/info.txt");

//   //listen for data event
//   readableStream.on("data", (chunk) => {
//     //write chunks to the response.
//     res.write(chunk);
//   });

//   //listen for end event
//   readableStream.on("end", () => {
//     res.end();
//   });

//   //stream data in response.
//   //  readableStream.pipe(res);
// });

//file upload using multer middleware..............................................................................................

// server.post("/upload", upload.single("file"), (req, res) => {
//   console.log("object");
//   console.log(req.file);
//   res.send("File uploaded successfully!");
// });

//read command line arguments in nodejs............................

// let arguments= process.argv
// console.log('all arguments ', arguments);
// console.log('1st argument ', arguments[2]);
// console.log('2nd argument ', arguments[3]);

// some use of os modules................................................................
// const systemInfo = {
//   platform: os.platform(),
//   architecture: os.arch(),
//   totalMemory: os.totalmem(),
//   freeMemory: os.freemem(),
//   networkInterfaces: os.networkInterfaces(),
// };
// console.log(systemInfo);
// server.get('/', (req, res)=>{
//   res.send('welcome to express js')
// });

//.........................................................................................

server.listen(port, () => {
  console.log(`server is listenig on port ${port}`);
  // console.log(process);
});
