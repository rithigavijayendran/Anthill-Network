import asyncHandler from "express-async-handler";
import Review from "../models/reviewModel.js";
import Bus from "../models/busModel.js";

// 📝 Add a Review
const addReview = asyncHandler(async (req, res) => {
  const { bus, rating, comment } = req.body;

  if (!bus || !rating || !comment) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Check if the bus exists
  const existingBus = await Bus.findById(bus);
  if (!existingBus) {
    res.status(404);
    throw new Error("Bus not found");
  }

  // Check if the user has already reviewed this bus
  const existingReview = await Review.findOne({ user: req.user._id, bus });
  if (existingReview) {
    res.status(400);
    throw new Error("You have already reviewed this bus");
  }

  // Create a new review
  const review = await Review.create({
    user: req.user._id,
    bus,
    rating,
    comment,
  });

  res.status(201).json(review);
});

// 📋 Get All Reviews for a Bus
const getReviewsByBus = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ bus: req.params.busId })
    .populate("user", "name")
    .sort({ createdAt: -1 });

  res.status(200).json(reviews);
});

// ❌ Delete a Review (Only by the Review Owner)
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  if (review.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to delete this review");
  }

  await review.deleteOne();
  res.status(200).json({ message: "Review deleted successfully" });
});

export { addReview, getReviewsByBus, deleteReview };
