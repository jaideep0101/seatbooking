import "./Seats.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Seats() {
  const [seats, setSeats] = useState([]);
const [booked,setBooked] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/seats")
      .then((res) => {
        setSeats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [booked]);
console.log(seats);
function handleFunction(id){
  setBooked(!booked);
  axios.post(`http://localhost:3000/api/seats/${id}`)
  .then((res)=>{
    console.log(res.data);
  })
  .catch((err)=>{
    console.log(err);
  })
}

  return <div className="seatContainer">
  {seats && seats.map((seat)=>{
    return (
        <div onClick={()=> handleFunction(seat._id)} style={{backgroundColor : seat.status === 'Available' ? 'green' : 'red'}} className="seat"  key={seat._id} >
         <p>Seat No : {seat.number}</p>
         <p>Row No : {seat.row}</p>
         <p>Status : {seat.status}</p>
        </div>
    )
  })}
  </div>;
}

export default Seats;
