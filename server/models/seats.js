import mongoose from "mongoose";
const Schema = mongoose.Schema;

//Seat Model using mongoose schema
const seatSchema = new Schema({
  number: { type: Number, required: true },
  row: { type: Number, required: true },
  status: { type: String, enum: ["Available", "Booked"], default: "Available" },
});

const Seat = mongoose.model("Seat", seatSchema);
export default Seat;
