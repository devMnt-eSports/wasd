const express = require("express"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  cookieSession = require("cookie-session"),
  passport = require("passport"),
  TwitchStrategy = require("passport-twitch").Strategy,
  SteamStrategy = require("passport-steam").Strategy,
  cors = require("cors"),
  massive = require("massive"),
  path = require("path"),
  session = require("express-session");

const config = require("./config.json");

const port = 5000;

const dbConnectionString = `postgres://postgres:${config.dbPassword}@wasd.link/postgres`;

const app = express();

//app.use("/", express.static(`${__dirname}/src`));

massive(dbConnectionString).then(db => app.set("db", db));

app
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(cookieParser());
// .use(cookieSession({ secret: "keep this string a secret!" }))
app.use(
  session({
    secret: "some long string should go here.",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

//.use(express.static("../react-ui/build"));

passport.use(
  new TwitchStrategy(
    {
      clientID: config.clientID,
      clientSecret: config.clientSecret,
      callbackURL: "http://localhost:5000/logged/twitch",
      scope: "user_read"
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      const db = app.get("db");
      db.getUserByAuthId([profile.id]).then((user, err) => {
        console.log(`INITIAL: ${user}`);
        if (!user[0]) {
          console.log(`CREATING USER`);
          db
            .createUserByAuth([profile.displayName, profile.id])
            .then((user, err) => {
              console.log(`USER CREATED: ${JSON.stringify(user[0])}`);
              return done(err, user[0]);
            });
        } else {
          console.log(`FOUND USER: ${user[0]}`);
          return done(err, user[0]);
        }
      });
    }
  )
);
passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:5000/logged/steam",
      realm: "http://localhost:5000/logged/steam",
      apiKey: config.steamKey
    },
    function(identifier, profile, done) {
      console.log(profile);
      const db = app.get("db");
      db.getUserByAuthId([profile.id]).then((user, err) => {
        console.log(`INITIAL: ${user}`);
        if (!user[0]) {
          console.log(`CREATING USER`);
          db
            .createUserByAuth([profile.displayName, profile.id])
            .then((user, err) => {
              console.log(`USER CREATED: ${JSON.stringify(user[0])}`);
              return done(err, user[0]);
            });
        } else {
          console.log(`FOUND USER: ${user[0]}`);
          return done(err, user[0]);
        }
      });
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

app.get("/auth/steam", passport.authenticate("steam"));

app.get(
  "/logged/twitch",
  passport.authenticate("twitch", { failureRedirect: "/failure" }),
  function(req, res) {
    console.log(req.user);
    console.log(`Redirecting to "/"`);
    res.redirect("http://localhost:3000/");
  }
);

app.get(
  "/logged/steam",
  passport.authenticate("steam", { failureRedirect: "/failure" }),
  function(req, res) {
    console.log(req.user);
    console.log("redirecting to frontend");
    res.redirect("http://localhost:3000/");
  }
);

app.get("/failure", (req, res, next) => {
  res.send("fail!");
});

app.get("/forums", (req, res, next) => {
  const db = app.get("db");
  let posts = [];
  let user = {};
  db
    .getCurrentUser([req.user.id])
    .then(response => {
      user = response[0];
    })
    .then(() => {
      db
        .getForumPosts()
        .then(response => {
          console.log(response);
          posts = response;
        })
        .then(() => {
          // PUT A NEW SQL CALL HERE
          db
            .NEWSQLCALL()
            .then(response => {
              console.log(response);
              posts.push(response);
              res.send({ posts, user });
            })
            .catch(error => console.log(`Comments Error: ${error}`));
        })
        .catch(error => console.log(`Forums User Error: ${error}`));
    })
    .catch(error => console.log(`User Error: ${error}`));
});

app.post("/forums/post", (req, res, next) => {
  console.log(req.body);
  const db = app.get("db");
  db
    .postForumPost([
      req.body.user,
      req.body.content,
      req.body.title,
      req.body.user_profile_pic
    ])
    .then(response => {
      console.log(response);
      res.json(response);
    })
    .catch(error => console.log(`Post Error: ${error}`));
});

app.post("/forums/comment", (req, res, next) => {
  console.log(req.body);
  const db = app.get("db");
  db
    .postComment([
      req.body.title,
      req.body.user,
      req.body.content,
      req.body.user_profile_pic
    ])
    .then(response => res.json(response))
    .catch(error => console.log(`Comment Error: ${error}`));
});

app.get("/profile", (req, res, next) => {
  const db = app.get("db");
  db
    .getCurrentUser([req.user.id])
    .then(response => res.json(response[0]))
    .catch(error => console.log(`Error: ${error}`));
});

app.post("/profile/picture", (req, res, next) => {
  const db = app.get("db");
  db
    .postProfilePic([req.body.url, req.user.id])
    .then(response => res.json(response))
    .catch(error => console.log(`Error: ${error}`));
});

//app.get("*", (req, res) => {
//  res.sendFile(path.resolve(__dirname, "../react-ui/build", "index.html"));
//});

app.listen(port, () => {
  console.log(`It's Over ${port}!`);
});
