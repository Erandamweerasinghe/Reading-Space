const User = require('../database/models/User')
const bcrypt = require('bcrypt')

module.exports = (req , res) => {
    console.log(req.body)
    const {username , password } = req.body;
    // Find User
    User.findOne({ username }, (error,user) => {
        if(user){
            bcrypt.compare(password, user.password, (error, same) => {
                if(same){
                    req.session.userId = user._id
                    res.redirect('/');
                }
                else{
                    res.redirect('/user/login')
                }
            })
        }
        else{
            res.redirect('/user/login')
        }
    })
}