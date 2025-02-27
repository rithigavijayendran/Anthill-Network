import express from "express";
import { addBus, updateBus, getBuses, getBusById } from "../controllers/busController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Buses
 *   description: API endpoints for managing buses
 *
 * /api/buses:
 *   get:
 *     summary: Get all buses
 *     tags: [Buses]
 *     description: Retrieve a list of all buses (public route)
 *     responses:
 *       200:
 *         description: A list of buses.
 *
 *   post:
 *     summary: Add a new bus
 *     tags: [Buses]
 *     description: Admin only - Add a new bus to the system
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Bus successfully created
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized access
 */
router.get("/", getBuses);
router.post("/", authenticate, authorizeAdmin, addBus);

/**
 * @swagger
 * /api/buses/{id}:
 *   get:
 *     summary: Get a bus by ID
 *     tags: [Buses]
 *     description: Retrieve bus details by its ID (public route)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The bus ID
 *     responses:
 *       200:
 *         description: Bus details returned
 *       404:
 *         description: Bus not found
 *
 *   put:
 *     summary: Update bus details
 *     tags: [Buses]
 *     description: Admin only - Update bus details by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The bus ID
 *     responses:
 *       200:
 *         description: Bus details updated
 *       404:
 *         description: Bus not found
 *       401:
 *         description: Unauthorized access
 */
router.get("/:id", getBusById);
router.put("/:id", authenticate, authorizeAdmin, updateBus);

export default router;
