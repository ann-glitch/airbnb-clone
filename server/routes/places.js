const express = require("express");
const multer = require("multer");
const photosMiddleware = multer({ dest: "/tmp" });
const router = express.Router();
const {
  getPlaces,
  createPlace,
  uploadByLink,
  uploadFromDevice,
  getSinglePlace,
  getUserPlaces,
  updatePlace,
} = require("../controllers/place");
const { protect } = require("../middleware/auth");

router
  .route("/")
  .get(getPlaces)
  .post(protect, createPlace)
  .put(protect, updatePlace);
router.get("/user-place", protect, getUserPlaces);
router.get("/:id", getSinglePlace);
router.post("/upload-by-link", uploadByLink);
router.post("/upload", photosMiddleware.array("photos", 100), uploadFromDevice);

module.exports = router;
