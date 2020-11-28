module.exports = (req,res,next) =>{
    console.log(req.body.password)
    console.log(req.body.confirmpassword)
    if(req.body.password != req.body.confirmpassword) {
        return res.render('register',
        {
            errors : ['Confrim password doesnt match']
        })
    }
    next()
}