const express = require("express"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  cookieSession = require("cookie-session"),
  passport = require("passport"),
  twitchStrategy = require("passport-twitch").Strategy,
  cors = require("cors"),
  massive = require("massive"),
  path = require("path");

const config = require("./config.json");

const port = 5000;

const dbConnectionString = `postgres://postgres:${config.dbPassword}@wasd.link/postgres`;

const app = express();

//app.use("/", express.static(`${__dirname}/src`));

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
      callbackURL: "http://localhost:5000/logged",
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

app.get("/api/test", (req, res, next) => {
  const db = app.get("db");
  db
    .getAllUsers()
    .then(response => res.status(200).json(response))
    .catch(error => res.status(420).json(error));
});

app.get("/auth/twitch", passport.authenticate("twitch"));

app.get(
  "/logged",
  passport.authenticate("twitch", {
    failureRedirect: "localhost:3000/"
  }),
  function(req, res) {
    console.log(req.user);
    res.redirect("https://localhost:3000/");
  }
);

app.get("/forums", (req, res, next) => {
  const db = app.get("db");
  db
    .getForumPosts()
    .then(response => res.json(response))
    .catch(error => console.log(`Error: ${error}`));
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../react-ui/build", "index.html"));
});

app.listen(port, () => {
  console.log(`It's Over ${port}!`);
});
