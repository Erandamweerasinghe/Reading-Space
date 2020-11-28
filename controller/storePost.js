const path = require('path')
const Post = require('../database/models/Post')

module.exports = async (req,res) => {
    /* Insert new Record */ 
    const { image } = req.files
    //console.log(image)
    image.mv(path.resolve(__dirname, '..' ,'public/posts',image.name), (erro) =>{
        Post.create({
            ...req.body,
            image : '/posts/' + image.name,
            user_id : req.session.user_id
        }, (error, post) => {
            res.redirect("/");
        });
    })
}