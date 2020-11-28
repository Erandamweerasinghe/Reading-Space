const User = require('../database/models/User')
const path = require('path');

module.exports = (req,res) => {
    console.log(req.body)
    User.create(req.body, (error,user) => {
        if(error){
            console.log(error)
            const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            req.flash('registrationErrors',registrationErrors)
            req.flash('data',req.body)
            return res.redirect('/user/register')
        }
        res.redirect('/')
    })
};