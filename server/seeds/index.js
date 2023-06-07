import mongoose from "mongoose";
import Seat from "../models/seats.js" 
const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/seatbooking';

mongoose.connect(DB_URL)
.then(()=>{
    console.log("The database is connected");
});

const seedData = async ()=> {
    try{
     await Seat.deleteMany({});
        for (let i = 1; i <= 80; i++) {
          const newSeat = new Seat({
            number: i,
            row: Math.ceil(i / 7),
          });
         await newSeat.save();
        }
        }catch(err){
            console.log(err);
        }
    
    
}

seedData().then(()=>{
    mongoose.connection.close()
})

