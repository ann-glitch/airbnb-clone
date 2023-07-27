const Place = require("../models/Place");
const asyncHandler = require("express-async-handler");
const imageDownloader = require("image-downloader");
const fs = require("fs");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const mime = require("mime-types");

const bucket = "ann-booking-app";

// get all places
exports.getPlaces = asyncHandler(async (req, res) => {
  const places = await Place.find();

  res.status(200).json({
    success: true,
    places,
  });
});

// create a place
exports.createPlace = asyncHandler(async (req, res) => {
  req.body.user = req.user.id;

  const place = await Place.create(req.body);

  res.status(201).json({
    success: true,
    place,
  });
});

// upload to s3 bucket.
async function uploadToS3(path, originalFilename, mimetype) {
  const client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    },
  });
  const parts = originalFilename.split(".");
  const ext = parts[parts.length - 1];
  const newFilename = Date.now() + "." + ext;
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Body: fs.readFileSync(path),
      Key: newFilename,
      ContentType: mimetype,
      ACL: "public-read",
    })
  );

  return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}

// upload photo by link
exports.uploadByLink = asyncHandler(async (req, res) => {
  const { link } = req.body;
  const filename = "photo" + Date.now() + ".jpg";

  await imageDownloader.image({
    url: link,
    dest: "/tmp/" + filename,
  });

  const url = await uploadToS3(
    "/tmp/" + filename,
    filename,
    mime.lookup("/tmp/" + filename)
  );

  res.status(200).json({ url });
});

// upload photo from device
exports.uploadFromDevice = asyncHandler(async (req, res) => {
  const attachments = [];

  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname, mimetype } = req.files[i];
    const url = await uploadToS3(path, originalname, mimetype);
    attachments.push(url);
  }
  res.json(attachments);
});

// get single place
exports.getSinglePlace = asyncHandler(async (req, res) => {
  const { id } = req.params;

  res.json(await Place.findById(id));
});

// get user places
exports.getUserPlaces = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const places = await Place.find({ user: id });

  res.status(200).json({
    success: true,
    places,
  });
});

// update place
exports.updatePlace = asyncHandler(async (req, res) => {
  const {
    id,
    perks,
    addedPhotos,
    title,
    address,
    description,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  const place = await Place.findById(id);

  if (req.user.id === place.user.toString()) {
    place.set({
      perks,
      addedPhotos,
      title,
      address,
      extraInfo,
      description,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });

    await place.save();
  }

  res.status(200).json({
    success: true,
    data: place,
  });
});
