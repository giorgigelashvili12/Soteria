import type { SessionI } from "../interfaces/Session.interface.js";
import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  userAgent: { type: String, required: true },
  last_used: { type: String, required: true },
});

const Session = mongoose.model("Session", sessionSchema);
export default Session;
