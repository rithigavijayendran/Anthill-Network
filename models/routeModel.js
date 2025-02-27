import mongoose from "mongoose";

const routeSchema = mongoose.Schema(
  {
    source: { type: String, required: true },
    destination: { type: String, required: true },
    distance: { type: Number, required: true },
    estimatedTime: { type: String, required: true },
    stops: [{ type: String }],
  },
  { timestamps: true }
);

const Route = mongoose.model("Route", routeSchema);
export default Route;
