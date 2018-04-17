import mongoose from 'mongoose';
import passport from 'passport';

const User = mongoose.model('User');
const BnetStrategy = require('passport-bnet').Strategy;

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new BnetStrategy({
	clientID: process.env.BNET_ID,
	clientSecret: process.env.BNET_SECRET,
	callbackURL: "http://localhost:3000/auth/bnet/callback"
}, (accessToken, refreshToken, profile, done) => {
	return done(null, profile);
}));
