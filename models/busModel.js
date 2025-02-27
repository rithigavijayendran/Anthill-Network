import mongoose from "mongoose";

const busSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    busNumber: { type: String, required: true, unique: true },
    type: { type: String, required: true, enum: ["AC", "Non-AC", "Sleeper", "Seater"] },
    totalSeats: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    fare: { type: Number, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    route: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true },
  },
  { timestamps: true }
);

const Bus = mongoose.model("Bus", busSchema);
export default Bus;
