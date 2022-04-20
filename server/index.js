const express = require('express');
const cors = require('cors')
const router = require('./router')
const app = express()
const middleware = require('./middleware/auth')
const mongoose = require('mongoose')


app.use(cors());
app.use(middleware.decodeToken);
app.use(express.json());
app.use(router);
const port = 3001;


(async function bootstrap(){
  await mongoose.connect('mongodb://localhost/groupay')
  console.log('Connection has been established successfully.');
  app.listen(port, ()=> console.log('runnin on port 3001'))
})()