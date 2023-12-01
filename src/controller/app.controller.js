// import pakages
import bcrypt from 'bcrypt';
import passport from 'passport';

// import files
import  '../../middleware/google.oauth2.js';
import { userData } from "../../Dbms/mongodb.schema.js";
import sendMail from '../../config/nodemailer.js';

// appController function
export default class appController{
    welcome(req,res)
    { 
     return   res.render('welcome',{user:null})
    }
    signIn(req,res)
    {   
        res.render('signIn',{invalidCreds:null})
    };
    signUp(req,res)
    {   
        res.render('signUp',{})
    };
    signUp_user(req,res)
    { async function secure(){
        var {name,userName,password} = req.body;

        const salt =  await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password,salt);
      userData.create({
        name:name,userName:userName,password:secPass
    });
      };
      secure();
       return res.render('signIn',{invalidCreds:null})
    };
    signIn_user(req, res) {
      const { userName, password } = req.body;
  
      async function findUser() {
          try {
              const result = await userData.findOne({ userName });
  
              if (!result) {
                return res.render('signIn',{invalidCreds:'User not found'});
              }
              else{
                
                const user = result.name;
                const bcryptPass = result.password;
                // req.session.userEmail = req.body.userName;

                const passwordMatch = await bcrypt.compare(password, bcryptPass);
                if (passwordMatch) {
                    return res.render('welcome', { user });
                }else{
                  const invalidCreds = 'Invalid Credentials';
                  return res.render('signIn', { invalidCreds });
                }
              }
          } catch (error) {
              console.error('Error finding user:', error);
            return  res.status(500).send('Internal Server Error');
          }
      }
  
      findUser();
  };

  resetPass(req,res)
  {
    res.render('resetPass',{invalidCreds:null})
  };


  authGoogle(req,res){
    passport.authenticate('google',{scope:['email','profile']})
  };

  loginByGoogle(req,res)
  { console.log('google')
    passport.authenticate( 'google', {
        successRedirect: res.redirect('fromGoogle'),
        failureRedirect: 'authFailure'
})
  };
  fromGoogle(req,res)
  {
    res.render('welcome',{user:"jai rathore"})
  }
  resetSuccess(req,res)
  {
    res.render('resetPass',{invalidCreds:'Password set successfully'})
  }
  nodeMailer(req,res)
  { sendMail();
    res.render('resetPass',{invalidCreds:'A mail has been sent to your registered mail id'})
  }
};


