const express = require('express');
const router = express.Router();
const passport = require('passport');
const Dish = require('../models/dish');
const jwt = require('jsonwebtoken');
const e = require('express');

//insert new dish
router.post('/add',passport.authenticate('jwt',{session:false}),(req,res, next)=>{
    //return res.send('add dish..')
    const dish = new Dish({
        title: req.body.title,
        desc: req.body.desc,
        price : req.body.price
    });
    dish.save((err,dish)=>{
        if(err){
            return res.send({
                success: false,
                message:'error while saving,try again'
            });
        }
        if(!dish){
            return res.send({
                success: false,
                message:'Faild to save the dish,try again'
            });
        }
        return res.send({
            success: true,
            message:'Dish Saved Successfuly!',
            dish
        });
    });
});

//read dishes
router.get('/list',passport.authenticate('jwt',{session:false}),(req,res, next)=>{
    //return res.send('List of dishies..')
    Dish.find((err,dishies)=>{
        if(err){
            return res.send({
                success: false,
                message:'Faild to retrive the dishies,try again'
            });
        }
        if(!dishies){
            return res.send({
                success: false,
                message:'You have no dishies yet ,try to add some dishes!'
            });
        }
        return res.send({
            success: true,
           dishies
        });
    })
});

//delete dish
router.delete('/delete/:id',passport.authenticate('jwt',{session:false}),(req,res, next)=>{
   // return res.send('Delete dish..')
     const id = req.params.id
  Dish.remove({ _id: id }, (err, doc) => {
    if (err) {
        return res.send({
            success: false,
            message:'error try again'
        });
        
    }
    return res.send({
        success: true,
        message:'deleted success'
    });
  });
});

// router.get('basicdata',(req,res, next)=>{
//     dishes = [
//         {name: 'a',desc:'aa',price:1},
//         {name: 'b',desc:'bb',price:2},
//         {name: 'c',desc:'cc',price:3},
//     ];
//     users =[
//         {name:'mahmoud',email:'any@any.com',password:'123456'},
//         {name:'mahmoud2',email:'any2@any.com',password:'123456'},
//         {name:'mahmoud3',email:'any3@any.com',password:'123456'},
//     ]

//     dishes.forEach(element => {
//       Dish.findOne({name:element.name},(err,dish)=>{
//           if(err){
//               console.log(err);
//               return next();
//           }
//           if(dish){
//               console.log(dish);
//               return ;
//           }
//           element.save((error,data)=>{
//             if(error){
//                 console.log(err);
//                 return next();
//             }
//             console.log(data);
//             return next();
//         });
//       });
        
//     });


   
// })

module.exports = router;