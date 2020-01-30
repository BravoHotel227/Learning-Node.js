const express = require("express");
const {
  getReviews,
  getReview,
  addReview,
  updateReivew,
  deleteReview
} = require("../controllers/reviews");

const Review = require("../models/Review");
const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

router
  .route("/")
  .get(
    advancedResults(Review, {
      path: "bootcamp",
      select: "name description"
    }),
    getReviews
  )
  .post(protect, authorize("user", "admin"), addReview);

router
  .route("/:id")
  .get(getReview)
  .put(protect, authorize("user", "admin"), updateReivew)
  .delete(protect, authorize("user", "admin"), deleteReview);

module.exports = router;
