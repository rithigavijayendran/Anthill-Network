import asyncHandler from "express-async-handler";
import Bus from "../models/busModel.js";
import Route from "../models/routeModel.js";

// 📋 Get All Buses (Public)
const getBuses = asyncHandler(async (req, res) => {
  const buses = await Bus.find().populate("route", "source destination distance");
  res.status(200).json(buses);
});

// 📌 Get a Bus by ID (Public)
const getBusById = asyncHandler(async (req, res) => {
  const bus = await Bus.findById(req.params.id).populate("route", "source destination distance");
  
  if (!bus) {
    res.status(404);
    throw new Error("Bus not found");
  }

  res.status(200).json(bus);
});

// 🔧 Admin: Add a New Bus
const addBus = asyncHandler(async (req, res) => {
  const { name, busNumber, type, totalSeats, availableSeats, fare, departureTime, arrivalTime, route } = req.body;

  if (!name || !busNumber || !type || !totalSeats || !availableSeats || !fare || !departureTime || !arrivalTime || !route) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Check if the route exists
  const existingRoute = await Route.findById(route);
  if (!existingRoute) {
    res.status(404);
    throw new Error("Route not found");
  }

  // Check if the busNumber is already taken
  const existingBus = await Bus.findOne({ busNumber });
  if (existingBus) {
    res.status(400);
    throw new Error("Bus number already exists");
  }

  const bus = await Bus.create({
    name,
    busNumber,
    type,
    totalSeats,
    availableSeats,
    fare,
    departureTime,
    arrivalTime,
    route,
  });

  res.status(201).json(bus);
});

// 🔄 Admin: Update Bus Details
const updateBus = asyncHandler(async (req, res) => {
  const bus = await Bus.findById(req.params.id);

  if (!bus) {
    res.status(404);
    throw new Error("Bus not found");
  }

  // Update fields
  bus.name = req.body.name || bus.name;
  bus.busNumber = req.body.busNumber || bus.busNumber;
  bus.type = req.body.type || bus.type;
  bus.totalSeats = req.body.totalSeats || bus.totalSeats;
  bus.availableSeats = req.body.availableSeats || bus.availableSeats;
  bus.fare = req.body.fare || bus.fare;
  bus.departureTime = req.body.departureTime || bus.departureTime;
  bus.arrivalTime = req.body.arrivalTime || bus.arrivalTime;

  if (req.body.route) {
    const existingRoute = await Route.findById(req.body.route);
    if (!existingRoute) {
      res.status(404);
      throw new Error("Route not found");
    }
    bus.route = req.body.route;
  }

  const updatedBus = await bus.save();
  res.status(200).json(updatedBus);
});

export { getBuses, getBusById, addBus, updateBus };
