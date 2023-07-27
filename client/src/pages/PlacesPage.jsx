import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import PlaceImg from "../components/PlaceImg";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // Fetch places from backend API
    loadExistingPlaces();
  }, []);

  const loadExistingPlaces = async () => {
    const response = await axios.get("/api/v1/places/user-place");

    setPlaces(response.data.places);
  };
  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex bg-primary text-white rounded-full py-2 px-6 gap-2"
          to={"/account/places/new"}>
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/account/places/" + place._id}
              key={place._id}
              className="cursor-pointer flex bg-gray-100 gap-4 p-4 rounded-2xl mt-2">
              <div className="flex w-32 h-32 bg-gray-300 shrink-0">
                <PlaceImg place={place} />
              </div>
              <div className="grow-0 shrink">
                <p className="text-3xl">{place.title}</p>
                <p className="text-sm mt-2s">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;
