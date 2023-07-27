const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// register user
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (req.body.password === req.body.password2) {
    // create user
    const user = await User.create({ name, email, password });

    // create token
    const token = user.getSignedWebToken();

    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    // if (process.env.NODE_ENV === "production") {
    //   options.sameSite = "none";
    //   options.secure = true;
    // }

    res.status(201).cookie("token", token, options).json({
      success: true,
      token,
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401).json({
      success: false,
      error: "Passwords do not match.",
    });
  }
});

// user login
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //validation for email & password
  if (!email || !password) {
    return next(new ErrorResponse(`Please provide an email and password`, 400));
  }

  //check user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse(`Invalid Credentials`, 401));
  }

  //check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse(`Invalid Credentials`, 401));
  }
  //create token
  const token = user.getSignedWebToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };
  // if (process.env.NODE_ENV === "production") {
  //   options.sameSite = "none";
  //   options.secure = true;
  // }

  res.status(200).cookie("token", token, options).json({
    success: true,
    token,
    id: user._id,
    name: user.name,
    email: user.email,
  });
});

// get logged in user
exports.getMe = asyncHandler(async (req, res, next) => {
  // Get the token from the cookie
  const token = req.cookies.token;

  // Verify the token
  if (token) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const { _id, name, email } = await User.findById(decodedToken.id);

    res.status(200).json({
      _id,
      name,
      email,
    });
  } else {
    res.status(404).json({
      error: "Invalid token",
    });
  }
});

// logout route
exports.logout = asyncHandler(async (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: "Logged out successfully",
  });
});
