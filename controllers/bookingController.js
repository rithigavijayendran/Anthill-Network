import asyncHandler from "express-async-handler";
import Booking from "../models/bookingModel.js";
import Bus from "../models/busModel.js";

// 🎟️ Book a Seat
const bookSeat = asyncHandler(async (req, res) => {
  const { bus, route, seatsBooked, totalFare } = req.body;

  if (!bus || !route || !seatsBooked || !totalFare) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Find the selected bus
  const selectedBus = await Bus.findById(bus);
  if (!selectedBus) {
    res.status(404);
    throw new Error("Bus not found");
  }

  // Check if enough seats are available
  if (selectedBus.availableSeats < seatsBooked) {
    res.status(400);
    throw new Error("Not enough seats available");
  }

  // Reduce available seats
  selectedBus.availableSeats -= seatsBooked;
  await selectedBus.save();

  // Create the booking
  const booking = await Booking.create({
    user: req.user._id,
    bus,
    route,
    seatsBooked,
    totalFare,
    status: "Booked",
  });

  res.status(201).json(booking);
});

// 📋 Get All Bookings for Logged-in User
const getUserBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("bus", "name busNumber type")
    .populate("route", "source destination");

  res.status(200).json(bookings);
});

// 🆔 Get Booking by ID
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate("bus", "name busNumber type")
    .populate("route", "source destination");

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  if (booking.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to view this booking");
  }

  res.status(200).json(booking);
});

// ❌ Cancel a Booking
const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  if (booking.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to cancel this booking");
  }

  if (booking.status === "Cancelled") {
    res.status(400);
    throw new Error("Booking is already cancelled");
  }

  // Restore seats
  const bus = await Bus.findById(booking.bus);
  if (bus) {
    bus.availableSeats += booking.seatsBooked;
    await bus.save();
  }

  // Update booking status
  booking.status = "Cancelled";
  await booking.save();

  res.status(200).json({ message: "Booking cancelled successfully" });
});

export { bookSeat, getUserBookings, getBookingById, cancelBooking };
