const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//Login
router.post('/login', (req, res, next) => {
  //res.send('You are in Login Page NOW..')
  const email = req.body.email
  const password = req.body.password

  const cond = { email }
  User.findOne(cond, (err, user) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error, please Try again error details: ' + err.message
      })
    }
    if (!user) {
      return res.send({
        success: false,
        message: 'Sorry : Account not found'
      });
    }

    user.isMatched(password, user.password,(err,isMatch)=>{
        if(!isMatch){
            return res.send({
                success: false,
                message: 'Sorry, Invalid Password'
            });
        }
        const oneWeek =  604800
        const token= jwt.sign({user},process.env.SECRET,{expiresIn: oneWeek});
        let returnedUser={
          name: user.name,
          email: user.email,
          id : user._id,
          token
        }
        return res.send({
            success: true,
            message : 'Login Successfuly !',
            returnedUser
        })
    })
  })
})

//Register

router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  newUser.save((err, user) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Faild to Register the new user'
      })
    }
    res.send({
      success: true,
      message: 'user has been created successfully!',
      user
    })
  })
  //   console.log(newUser);
  //   res.sendStatus(200);
})

module.exports = router
