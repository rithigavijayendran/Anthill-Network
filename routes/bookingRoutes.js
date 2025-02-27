import express from "express";
import { bookSeat, cancelBooking, getUserBookings, getBookingById } from "../controllers/bookingController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: API endpoints for bus booking management
 */

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get all bookings for the logged-in user
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of user bookings
 *       401:
 *         description: Unauthorized - Token required
 */
router.get("/", authenticate, getUserBookings);

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Book a seat on a bus
 *     tags: [Bookings]
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
 *               - route
 *               - seatsBooked
 *               - totalFare
 *             properties:
 *               bus:
 *                 type: string
 *                 description: Bus ID
 *               route:
 *                 type: string
 *                 description: Route ID
 *               seatsBooked:
 *                 type: number
 *                 description: Number of seats to book
 *               totalFare:
 *                 type: number
 *                 description: Total fare for booking
 *     responses:
 *       201:
 *         description: Booking successful
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticate, bookSeat);

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Get details of a specific booking
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking details retrieved successfully
 *       404:
 *         description: Booking not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", authenticate, getBookingById);

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     summary: Cancel a booking
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 *       404:
 *         description: Booking not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", authenticate, cancelBooking);

export default router;
