import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import Seats from "../server/models/seats.js";

const port = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/seatbooking";

// mongoose database connection 
mongoose.connect(DB_URL)
.then(() => {console.log("Data base connected !")})
.catch((err) => {console.log(err)});

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Api to fetch all the seats in database
app.get("/api/seats", async (req, res) => {
  const allSeats = await Seats.find({});
  res.status(200).json(allSeats);
});

//Api to book a seat 
app.post("/api/seats/:id", async (req, res) => {
  const { id } = req.params;
  const seat = await Seats.findById(id);
  if (seat) {
    seat.status = seat.status === "Available" ? "Booked" : "Available";
    await seat.save();
    res.status(200).json({ seat });
  } else {
    res.status(404).json({ message: "Internal error" });
  }
});

// Nodejs server 
app.listen(port, (req, res) => {
  console.log("Server is up running !");
});
