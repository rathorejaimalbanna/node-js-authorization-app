
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import passport from 'passport';
import { userData } from '../Dbms/mongodb.schema.js';


passport.use(new GoogleStrategy({
    clientID: "883936926640-1d4c6m28vkd21c0cgm14bue43gtd486n.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3200/loginByGoogle",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    userData.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user,done){
  done(null,user)
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
