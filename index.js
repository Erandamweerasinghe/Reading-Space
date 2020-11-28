const expressEdge = require('express-edge')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const connectFlash = require('connect-flash')
const edege = require('edge.js')
const User = require('./database/models/User')

const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')
const homePageController = require('./controller/homePage')
const contactPageController = require('./controller/contact')
const aboutPageController = require('./controller/about')
const bookPageController = require('./controller/book')
const articlePageController = require('./controller/article')
const newspaperPageController = require('./controller/newspaper')
const userRegisterController = require('./controller/register')
const storeUserController = require('./controller/storeUser')
const auth = require('./middleware/auth')
const loginUserController = require('./controller/login')
const authenticateUserController = require('./controller/authenticateUser')
const logoutUserController = require('./controller/logout')
const confirmPasswordController = require('./middleware/confirmPassword')

const app = new express()
mongoose.connect('mongodb://localhost/readingSpace')
const mongoStore = connectMongo(expressSession)

app.use(fileUpload())
app.use(express.static('public'))
app.use(expressEdge)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(connectFlash())
app.use(expressSession({
    secret : 'secret',
    store : new mongoStore({
        mongooseConnection : mongoose.connection
    })
}))
app.use('*', async (req,res,next) => {
    edege.global('userId',req.session.userId)
    if(req.session && req.session.userId && req.url != '/user/logout'){
       await User.findOne({ _id:req.session.userId }, (error,user) => {
            if(user){
                edege.global('username',user.username)
            }
            else
                console.log('user NOt Found')
        })
    }
    next()
})
app.use('/user/store',confirmPasswordController)

app.get('/',homePageController)
app.get('/contact',contactPageController)
app.get('/about',aboutPageController)
app.get('/book',bookPageController)
app.get('/article/:page',articlePageController)
app.get('/newspaper',newspaperPageController)
app.get('/user/register',userRegisterController)
app.get('/user/login',loginUserController)
app.get('/user/logout',logoutUserController)

app.post('/user/store',storeUserController)
app.post('/user/authentication',authenticateUserController)
app.post('/article/:page',articlePageController)


app.listen(4000,() =>{
    console.log('Server is Runnig | Port : 4000');
})