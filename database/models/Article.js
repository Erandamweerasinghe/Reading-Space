const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema({
    title : {
       type : String,
       required : [true, "Title is Required"]
    },
    description : String,
    content : String,
    attachment : String,
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },
    type : {
        type : String,
        required : [true, "Article Type is Required"]
    },
    createdAt : {
        type : Date,
        default : new Date()
    }
})

const Article = mongoose.model('Article',ArticleSchema)

module.exports = Article