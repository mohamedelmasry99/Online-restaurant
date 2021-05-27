const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
module.exports= function(passport){

let opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET ;

passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
    //console.log(jwt_payload.user._id);
    User.findById(jwt_payload.user._id,(err, user)=>{
        if(err){
            console.log(err);
            return done(err,false);
        }
        if(user){
            //console.log(user);
            return done(null,user)
        }
    });

}));
}
