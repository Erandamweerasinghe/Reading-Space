const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : [true,'First name is Required']
    },
    lastname : {
        type : String,
        required : [true,'Last name is Required']
    },
    birthday :{
        type : Date
        ,required : [true, 'Birthday is Required']
    },
    email : {
        type : String,
        required : [true,'Email is Required']
        ,unique : [true, 'Email address is Already Taken']
    },
    gender :{
        type : String
        ,required : [true,'Gender is Required']
    },
    username : {
        type : String,
        required : [true,'User name is Required'],
        unique : [true, 'User name is Already Taken'],
        default : "Unknown"
    },
    password : {
        type : String
        ,required : [true,'Password is Required']
    }  
})

UserSchema.pre('save',function(next){
    const user = this

    bcrypt.hash(user.password, 10, function(error,encrypted){
        user.password = encrypted
        next()
    })
})

module.exports = mongoose.model('User',UserSchema)