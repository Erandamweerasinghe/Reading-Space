const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title : String,
    description : String,
    content : String,
    image : String,
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },
    username : {
        type : String,
        default : 'Unknown'
    },
    createdAt : {
        type : Date,
        default : new Date()
    }
})

const Post = mongoose.model('Post',PostSchema)

module.exports = Post