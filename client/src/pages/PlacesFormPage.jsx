import { useState, useEffect } from "react";
import Perks from "../components/Perks";
import AccountNav from "../components/AccountNav";
import PhotosUploader from "../components/PhotosUploader";

import axios from "axios";
import { useParams, Navigate } from "react-router-dom";

const PlacesFormPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    description: "",
    extraInfo: "",
    checkIn: "",
    checkOut: "",
    maxGuests: 1,
    price: 100,
  });
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/v1/places/" + id).then((response) => {
      const { data } = response;
      setFormData({
        title: data.title,
        address: data.address,
        description: data.description,
        extraInfo: data.extraInfo,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        maxGuests: data.maxGuests,
        price: data.price,
      });
      setAddedPhotos(data.addedPhotos);
      setPerks(data.perks);
    });
  }, [id]);

  //helper functions
  const inputLabel = (text) => {
    return (
      <label htmlFor="title" className="text-2xl mt-4">
        {text}
      </label>
    );
  };

  const inputDescription = (text) => {
    return <p className="text-gray-500 text-sm">{text}</p>;
  };

  const preInput = (label, description) => {
    return (
      <>
        {inputLabel(label)}
        {inputDescription(description)}
      </>
    );
  };

  //handle input
  const handleInput = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // update place
    if (id) {
      await axios.put("/api/v1/places", {
        id,
        ...formData,
        addedPhotos,
        perks,
      });
      setRedirect(true);
    } else {
      // add new place
      await axios.post("/api/v1/places", {
        ...formData,
        addedPhotos,
        perks,
      });
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={handleSubmit}>
        {preInput("Title:", "Title for your place should be short and catchy.")}
        <input
          type="text"
          placeholder="My Lovely Apartment"
          id="title"
          value={formData.title}
          onChange={handleInput}
        />{" "}
        <br /> <br />
        {preInput("Address:", "Address to this place.")}
        <input
          type="text"
          placeholder="St. Robert, MO 65584-5678"
          id="address"
          value={formData.address}
          onChange={handleInput}
        />{" "}
        <br /> <br />
        {preInput("Photos:", "more = better.")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        <br />
        {preInput("Description:", "Description of the place.")}
        <textarea
          id="description"
          value={formData.description}
          onChange={handleInput}
          required
        />
        <br />
        {preInput("Perks:", "Select all the perks of your place")}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-2">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput("Extra Info:", "house rules etc.")}
        <textarea
          id="extraInfo"
          value={formData.extraInfo}
          onChange={handleInput}
        />
        <br />
        {preInput(
          "CheckIn & CheckOut:",
          "Specify the CheckIn & CheckOut time and remember to have some time window for cleaning between guests."
        )}
        <br />
        <div className="grid md:grid-cols-3 gap-2">
          <div>
            <label htmlFor="check in" className="mt-2 -mb-1">
              Check In time:
            </label>
            <input
              type="text"
              placeholder="14:00"
              id="checkIn"
              value={formData.checkIn}
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="check out" className="mt-2 -mb-1">
              Check Out time:
            </label>
            <input
              type="text"
              placeholder="18:00"
              id="checkOut"
              value={formData.checkOut}
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="maxGuests" className="mt-2 -mb-1">
              Max number of guests:
            </label>
            <input
              type="number"
              placeholder="6"
              id="maxGuests"
              value={formData.maxGuests}
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="price" className="mt-2 -mb-1">
              Price per night:
            </label>
            <input
              type="number"
              placeholder="100"
              id="price"
              value={formData.price}
              onChange={handleInput}
            />
          </div>
        </div>
        <div>
          <button className="primary my-4">Save</button>
        </div>
      </form>
    </div>
  );
};

export default PlacesFormPage;
