const path = require('path');
const Article = require('../database/models/Article');
const User = require('../database/models/User')
const SHOWING = 3.0;
var count = 0;

module.exports = async (req,res) => {
    if(req.params.page.substring(0,4) == 'view'){
        await viewAllArticles(req,res);
    }
    else if(req.params.page == 'new'){
        if(req.session.userId){
            res.render(path.resolve(__dirname,'..','views','newArticle'),
            { title : 'New Article'});
        }
        else{
            res.redirect('/user/login')
        }
        
    }
    else if(req.params.page == 'store'){ /* Post New Article */
        /* Insert new Record */
        attachment = false;
        if(req.files){
            const { attachment } = req.files
        }
        Article.create({
                ...req.body,
                attachment : attachment == undefined ? undefined : '/article/' + attachment.name,
                user_id : req.session.userId
            }, (error,article) => {
                if(attachment){
                   attachment.mv(path.resolve(__dirname,'..','public/article',article._id + path.extname(attachment.name))
                        ,(error) => {
                             res.redirect("/article/view-1")
                    });
                }
                else{
                    res.redirect("/article/view-1")
                }
        })
    }
};
/* Displays all articles */
async function viewAllArticles(req ,res){
    const split = req.params.page.split('-')
    if(split.length < 2)
        return res.redirect('/article/view-1')
    const reqTab = parseInt(split[1], 10)
    const count = await Article.count({})
    const articles = await Article.find({},[],
        { 
            skip : (SHOWING * (reqTab - 1)),
            limit : (SHOWING * (reqTab)),
            sort:{createdAt: -1} 
        })
    var tabsCount =  Math.ceil(count / SHOWING)
    var tabs = []
    for(j = ((reqTab - (reqTab % 3)) + 1) ,i = 0; j <= tabsCount && i < 3; i++,j++){
        tabs[i] = j
    }
    //console.log(count)
    var next = ((j-1) < tabsCount)
    await articles.forEach(async element => {
        const user = await User.findById(element.user_id);
        if(user)
            element.username = await user.username 
        //element.username = element.user_id
    });
    await res.render(path.resolve(__dirname,'..','views','article'),
        { title : 'Articles', articles, tabs, selected : reqTab,next});
}