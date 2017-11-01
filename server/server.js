const express = require("express"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  cookieSession = require("cookie-session"),
  passport = require("passport"),
  twitchStrategy = require("passport-twitch").Strategy,
  cors = require("cors"),
  massive = require("massive");

const config = require("./config.json");

const port = 5000;

const dbConnectionString = `postgres://postgres:${config.dbPassword}@wasd.link/postgres`;

const app = express();

massive(dbConnectionString).then(db => app.set("db", db));

app
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cookieParser())
  .use(cookieSession({ secret: "keep this string a secret!" }))
  .use(passport.initialize())
  .use(express.static("../react-ui/build"));

passport.use(
  new twitchStrategy(
    {
      clientID: config.clientID,
      clientSecret: config.clientSecret,
      callbackURL: "http://localhost:3000/logged",
      scope: "user_read"
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      return done();
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get("/auth/twitch", passport.authenticate("twitch"));

// app.get("/logged",
// 	passport.authenticate("twitch", {failureRedirect:"/"}),
// 	function(req, res) {
// 	    console.log(req.user);
// 	    res.redirect("/logged");
// 	});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../react-ui/build", "index.html"));
});

app.listen(port, () => {
  console.log(`It's Over ${port}!`);
});
