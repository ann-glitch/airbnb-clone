const express = require("express");
const router = express.Router();
const { createBookings, getBookings } = require("../controllers/booking");
const { protect } = require("../middleware/auth");

router.post("/", protect, createBookings);
router.get("/", protect, getBookings);

module.exports = router;
