if (process.env.NODE_ENV !== "production") { 
    require("dotenv").config(); // Load .env only in development
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const Sentiment = require('sentiment');
const sentiment = new Sentiment();
const i18next = require("i18next");
const Backend = require("i18next-http-backend");
const middleware = require("i18next-http-middleware");

// Session configuration
const sessionOptions = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expire: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

// Middleware setup
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// Routes
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// MongoDB connection (development/production specific)
async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to db");
    } catch (err) {
        console.log(err);
    }
}
main();

// Set views and static files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

// Routes handling
app.use("/listings", listingRouter);
app.use("/reviews", reviewRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// i18next Configuration
i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    backend: {
      loadPath: path.join(__dirname, "/locales/{{lng}}.json"),
    },
    detection: {
      order: ["querystring", "cookie", "header"],
      caches: ["cookie"],
    },
  });

app.use(middleware.handle(i18next));

// Error handling
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong" } = err;
    res.status(status).render("listings/error.ejs", { err });
});

// SSL/TLS handling (production only)
if (process.env.NODE_ENV === "production") {
    const fs = require('fs');
    const https = require('https');

    const options = {
        key: fs.readFileSync('/home/ubuntu/ssl/privkey.pem'),
        cert: fs.readFileSync('/home/ubuntu/ssl/fullchain.pem'),
    };

    https.createServer(options, app).listen(443, () => {
        console.log('Server is running on https://quickart.ddns.net');
    });
} else {
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
}
