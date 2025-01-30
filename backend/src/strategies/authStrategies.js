const passport = require('passport');
const GithubStrategy = require("passport-github2").Strategy;
const {User, Role} = require('./../models');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/api/v1/auth/github/callback`
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ where: { githubId: profile.id }});
      
      if (!user) {
        user = await User.create({
          githubId: profile.id,
          email: profile.emails?.[0]?.value,
          name: profile.displayName || profile.username,
          status: 'active',
          lastLogin: new Date()
        });

        // Assign default client role
        const clientRole = await Role.findOne({ where: { name: 'client' }});
        if (clientRole) {
          await user.addRole(clientRole);
        }
      }
      
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));