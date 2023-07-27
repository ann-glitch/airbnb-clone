const express = require("express");
const colors = require("colors");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 5001;

// import route files
const auth = require("./routes/auth");
const places = require("./routes/places");
const booking = require("./routes/booking");

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// server static files
app.use("/uploads", express.static(__dirname + "/uploads"));

// env
dotenv.config({ path: "./config/config.env" });

// mongodb connection
connectDB();

//set mongo sanitize
app.use(mongoSanitize());

// set security policy
app.use(helmet());

// // prevent XSS attack
app.use(xss());

// rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100,
});

app.use(limiter);

// prevent http param pollution
app.use(hpp());

//cors
app.use(
  cors({
    origin: true,
    credentials: true,
    optionSuccessStatus: 200,
  })
);

// cookie-parser
app.use(cookieParser());

//dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.set("trust proxy", 1); // trust first proxy

//mount routers
app.use("/api/v1/auth", auth);
app.use("/api/v1/places", places);
app.use("/api/v1/bookings", booking);

// test page
app.get("/", (req, res) => {
  res.send("started app");
});

//error handler middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(
    `App running in ${process.env.NODE_ENV} mode on port ${port}`.cyan
  );
});
