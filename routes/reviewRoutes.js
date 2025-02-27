import express from "express";
import {
  addReview,
  getReviewsByBus,
  deleteReview,
} from "../controllers/reviewController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Add a review for a bus
 *     tags: [Reviews]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bus
 *               - rating
 *               - comment
 *             properties:
 *               bus:
 *                 type: string
 *                 description: ID of the bus being reviewed
 *               rating:
 *                 type: number
 *                 description: Rating out of 5
 *               comment:
 *                 type: string
 *                 description: Review comment
 *     responses:
 *       201:
 *         description: Review added successfully
 *       400:
 *         description: Missing required fields or duplicate review
 *       404:
 *         description: Bus not found
 */
router.post("/", authenticate, addReview);

/**
 * @swagger
 * /api/reviews/{busId}:
 *   get:
 *     summary: Get all reviews for a specific bus
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: busId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the bus
 *     responses:
 *       200:
 *         description: List of reviews
 *       404:
 *         description: Bus not found
 */
router.get("/:busId", getReviewsByBus);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the review to delete
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       403:
 *         description: Not authorized to delete this review
 *       404:
 *         description: Review not found
 */
router.delete("/:id", authenticate, deleteReview);

export default router;
