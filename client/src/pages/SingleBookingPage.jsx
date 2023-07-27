import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../components/AddressLink";
import BookingDates from "../components/BookingDates";
import PlaceGallery from "../components/PlaceGallery";

const SingleBookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get("/api/v1/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return " ";
  }

  return (
    <div className="mt-4 lg:max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">{booking.place.title}</h1>
      <AddressLink>{booking.place.address}</AddressLink>
      <div className="flex items-center justify-between bg-gray-200 p-6 my-6 rounded-2xl">
        <div>
          <h2 className="text-2xl mb-4">Your booking information</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-4 text-white rounded-2xl">
          <div>Total Price</div>
          <div className="text-2xl">${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
};

export default SingleBookingPage;
