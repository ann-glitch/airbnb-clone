const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },

  address: {
    type: String,
    required: [true, "Please add an address"],
  },

  addedPhotos: {
    type: [String],
    required: [true, "Please add the pictures of the clothes"],
  },

  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  extraInfo: {
    type: String,
  },

  perks: {
    type: [String],
    required: [true, "Please add the perks"],
    enum: ["wifi", "park", "tv", "kitchen", "pets", "entrance"],
  },

  checkIn: {
    type: String,
  },

  checkOut: {
    type: String,
  },

  maxGuests: {
    type: Number,
  },

  price: {
    type: Number,
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Place", PlaceSchema);
