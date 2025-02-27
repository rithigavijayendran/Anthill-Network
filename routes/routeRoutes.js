import express from "express";
import { addRoute, updateRoute, getRoutes, getRouteById } from "../controllers/routeController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Routes
 *     description: API endpoints related to bus routes
 */

/**
 * @swagger
 * /api/routes:
 *   get:
 *     summary: Get all routes
 *     description: Retrieve a list of all available routes.
 *     tags: [Routes]
 *     responses:
 *       200:
 *         description: A list of routes.
 */
router.get("/", getRoutes);

/**
 * @swagger
 * /api/routes/{id}:
 *   get:
 *     summary: Get a single route by ID
 *     description: Retrieve details of a specific route by its ID.
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the route to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Route details retrieved successfully.
 *       404:
 *         description: Route not found.
 */
router.get("/:id", getRouteById);

/**
 * @swagger
 * /api/routes:
 *   post:
 *     summary: Admin - Add a new route
 *     description: Create a new route (Admin only).
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               source:
 *                 type: string
 *               destination:
 *                 type: string
 *               distance:
 *                 type: number
 *               estimatedTime:
 *                 type: string
 *               stops:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Route added successfully.
 *       400:
 *         description: Invalid input data.
 *       401:
 *         description: Unauthorized.
 */
router.post("/", authenticate, authorizeAdmin, addRoute);

/**
 * @swagger
 * /api/routes/{id}:
 *   put:
 *     summary: Admin - Update route details
 *     description: Update an existing route (Admin only).
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the route to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               source:
 *                 type: string
 *               destination:
 *                 type: string
 *               distance:
 *                 type: number
 *               estimatedTime:
 *                 type: string
 *               stops:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Route updated successfully.
 *       400:
 *         description: Invalid input data.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Route not found.
 */
router.put("/:id", authenticate, authorizeAdmin, updateRoute);

export default router;
