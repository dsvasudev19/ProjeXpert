const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { User, Role } = require('../models');

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

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/api/v1/auth/github/callback`
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log("profile", profile)
    console.log("accessToken", accessToken)
    console.log("refreshToken", refreshToken)
    try {
      let user = await User.findOne({ where: { githubId: profile.id }});
      
      if (!user) {
        // Fetch the 'client' role first
        const clientRole = await Role.findOne({ where: { name: 'client' } });
        
        if (!clientRole) {
          return done(new Error('Client role not found.'));
        }

        // Create the user
        user = await User.create({
          githubId: profile.id,
          email: profile.emails?.[0]?.value,
          name: profile.displayName || profile.username,
          status: 'active',
          lastLogin: new Date(),
          githubUsername: profile.username,
          avatar: profile.photos[0].value
        });

        // Associate the user with the 'client' role
        await user.addRole(clientRole);
      }
      
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

module.exports = passport; 