import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";

const SinglePlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState([]);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/v1/places/" + id).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) {
    return "";
  }

  return (
    <div className="mt-4 lg:max-w-5xl mx-auto">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-xl">About this place.</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn}
          <br />
          Check-out: {place.checkOut}
          <br />
          Max number of guests: {place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-gray-50 -mx-8 py-8 px-8 border-t">
        <div>
          <h2 className="font-semibold text-xl">Extra Info.</h2>
        </div>
        <div className="mb-4 mt-1 text-sm text-gray-700 leading-5">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
};

export default SinglePlacePage;
