const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  place: {
    type: mongoose.Schema.ObjectId,
    ref: "Place",
    required: true,
  },

  checkIn: {
    type: Date,
    required: [true, "Please add a check in date"],
  },

  checkOut: {
    type: Date,
    required: [true, "Please add a check out date"],
  },

  numberOfGuests: {
    type: String,
    required: [true, "Please add the number of guests"],
  },

  name: {
    type: String,
    required: [true, "Please add a name"],
  },

  phone: {
    type: String,
    required: [true, "Please add a phone number"],
  },

  price: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Booking", BookingSchema);
