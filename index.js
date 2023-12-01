// import pakages
import express from 'express';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import session from 'express-session';
import passport from 'passport';

// import internal files
import { db } from './Dbms/mongoose.connect.js';
import { userData } from './Dbms/mongodb.schema.js';
import appController from './src/controller/app.controller.js';
import './middleware/google.oauth2.js';

// configure our app
var filePath = path.join(path.resolve(),'src','views')
const AppController = new appController()
const app = express();
app.set('view engine','ejs');
app.set('views',filePath);
app.use(express.static(filePath));
var staticPath = path.join(path.resolve(),'config');
app.use(express.static(staticPath));
app.use(ejsLayouts);
app.use(express.urlencoded());
app.use(passport.initialize());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));


// define routes
app.get('/home',AppController.welcome)
app.get('/',AppController.signUp)
app.get('/signIn',AppController.signIn)
app.post('/signUp_user',AppController.signUp_user);
app.post('/signIn_user',AppController.signIn_user);
app.get('/resetPass',AppController.resetPass);
app.get('/google_auth',passport.authenticate('google',{scope:['email','profile']}));
app.get('/loginByGoogle',AppController.loginByGoogle);
app.get('/fromGoogle',AppController.fromGoogle);
app.get('/resetSuccess',AppController.resetSuccess);
app.get('/nodemailer',AppController.nodeMailer)

// listen to server
app.listen('3200',(err)=>{
    if(!err)
    {
        console.log('server is live on port 3200');
    }
})
