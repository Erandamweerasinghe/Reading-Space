const path = require('path');

module.exports = (req,res) => {
    res.render('register',{
        errors: req.flash('registrationErrors'),
        data: req.flash('data')[0],
        title : 'Register'
    });
};