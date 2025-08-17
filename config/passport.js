const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(customFields, async (email, password, done) => {
      try {
        const user = await db.findUser({ email });

        if (!user) {
          return done(null, false, {
            message: "Invalid email or password",
          });
        }

        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
          return done(null, false, { message: "Invalid email or password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
