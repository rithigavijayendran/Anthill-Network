import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    bus: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Bus" },
    route: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Route" },
    seatsBooked: { type: Number, required: true },
    totalFare: { type: Number, required: true },
    status: { type: String, enum: ["Booked", "Cancelled"], default: "Booked" },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
