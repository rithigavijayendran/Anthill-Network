import asyncHandler from "express-async-handler";
import Route from "../models/routeModel.js";

// 📋 Get All Routes (Public)
const getRoutes = asyncHandler(async (req, res) => {
  const routes = await Route.find();
  res.status(200).json(routes);
});

// 📌 Get a Route by ID (Public)
const getRouteById = asyncHandler(async (req, res) => {
  const route = await Route.findById(req.params.id);

  if (!route) {
    res.status(404);
    throw new Error("Route not found");
  }

  res.status(200).json(route);
});

// 🔧 Admin: Add a New Route
const addRoute = asyncHandler(async (req, res) => {
  const { source, destination, distance, estimatedTime, stops } = req.body;

  if (!source || !destination || !distance || !estimatedTime) {
    res.status(400);
    throw new Error("All required fields must be provided");
  }

  // Check if the route already exists
  const existingRoute = await Route.findOne({ source, destination });
  if (existingRoute) {
    res.status(400);
    throw new Error("Route already exists");
  }

  const route = await Route.create({
    source,
    destination,
    distance,
    estimatedTime,
    stops: stops || [],
  });

  res.status(201).json(route);
});

// 🔄 Admin: Update Route Details
const updateRoute = asyncHandler(async (req, res) => {
  const route = await Route.findById(req.params.id);

  if (!route) {
    res.status(404);
    throw new Error("Route not found");
  }

  // Update fields
  route.source = req.body.source || route.source;
  route.destination = req.body.destination || route.destination;
  route.distance = req.body.distance || route.distance;
  route.estimatedTime = req.body.estimatedTime || route.estimatedTime;
  route.stops = req.body.stops || route.stops;

  const updatedRoute = await route.save();
  res.status(200).json(updatedRoute);
});

export { getRoutes, getRouteById, addRoute, updateRoute };
