const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true }
})

UserSchema.pre('save', function (next) {
    if(!this.isModified('password')){
        return next();
    }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(erro)
    }
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(erro)
      }
      this.password = hash
      next()
    })
  })
})

UserSchema.methods.isMatched = function(plaintext,hashed,callback){
    bcrypt.compare(plaintext,hashed,(err,isMatch)=>{
        if(err){
            next(err);
        }
        callback(null, isMatch);
    });
}
const User = mongoose.model('User', UserSchema)

module.exports = User
