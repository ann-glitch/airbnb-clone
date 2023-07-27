const asyncHandler = require("express-async-handler");
const Booking = require("../models/Booking");

exports.createBookings = asyncHandler(async (req, res) => {
  req.body.user = req.user.id;

  const bookings = await Booking.create(req.body);

  res.status(201).json(bookings);
});

exports.getBookings = asyncHandler(async (req, res) => {
  const booking = await Booking.find({ user: req.user.id }).populate("place");

  res.status(200).json(booking);
});
