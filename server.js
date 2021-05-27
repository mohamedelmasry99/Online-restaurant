// Import all dependencies
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
// Intiailze app with express
const app = express();
const UserRoutes = require('./routes/users');
const DishRoutes = require('./routes/dishies')
//database connection
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
  console.log('Connectect to database')
})
mongoose.connection.on('error', err => {
  console.log('unable to connect to database' + err)
})

const _PORT = process.env.PORT

// using app components 
app.use(cors());
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res,next)=>{
    res.send('App is live Now..');
});

app.use('/users',UserRoutes);
app.use('/dishies',DishRoutes);
//start the server
app.listen(_PORT, () => {
  console.log('Server is Running Now..')
})
