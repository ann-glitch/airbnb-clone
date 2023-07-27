import { useContext, useState, useEffect } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const bookThisPlace = async () => {
    const response = await axios.post("/api/v1/bookings", {
      place: place._id,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect("/account/bookings/" + bookingId);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-gray-50 shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price} / per night.
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label htmlFor="checkIn">Check In:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
              }}
              required
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label htmlFor="checkOut ">Check Out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => {
                setCheckOut(e.target.value);
              }}
              required
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label htmlFor="numberOfGuests">Number of Guests:</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(e) => {
              setNumberOfGuests(e.target.value);
            }}
            required
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              required
            />

            <label>Phone number:</label>
            <input
              type="tel"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
              required
            />
          </div>
        )}
      </div>
      <button onClick={bookThisPlace} className="primary mt-4">
        Book this place for
        {numberOfNights > 0 && <span> ${numberOfNights * place.price}</span>}
      </button>
    </div>
  );
};

export default BookingWidget;
