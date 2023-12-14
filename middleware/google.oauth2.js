import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import passport from 'passport';
import { userData } from '../Dbms/mongodb.schema.js';

passport.use(new GoogleStrategy({
    clientID: "883936926640-1d4c6m28vkd21c0cgm14bue43gtd486n.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3200/loginByGoogle",
    passReqToCallback: true
  },
  async function (request, accessToken, refreshToken, profile, done) {
    request.session.userEmail = profile.emails[0].value;
    request.session.userName = profile.displayName;
    console.log(request.session.userName);
    console.log("this function is running")
    const user = {
      id: profile.emails[0].value,
      displayName: profile.displayName
    };

    // Save user data to the database if necessary
    // Example: await userData.create(user);

    return done(null, user);
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    // Assuming you have a 'User' model with a 'findById' method
    const user = await userData.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
