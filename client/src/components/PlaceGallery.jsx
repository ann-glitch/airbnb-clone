import React, { useState } from "react";
import Image from "./Image";

const PlaceGallery = ({ place }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  // show all uploaded images
  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-white min-w-full min-h-screen">
        <div className="p-8 lg:max-w-4xl mx-auto grid gap-4">
          <div>
            <h2 className="text-3xl mr-48">Photos of {place.title}.</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Close Photos
            </button>
          </div>
          {place?.addedPhotos?.length > 0 &&
            place.addedPhotos.map((addedPhoto) => (
              <div key={addedPhoto._id}>
                <Image src={addedPhoto} className="w-full" alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
        <div>
          {place.addedPhotos?.[0] && (
            <Image
              src={place.addedPhotos[0]}
              onClick={() => setShowAllPhotos(true)}
              className="aspect-square cursor-pointer object-cover w-full"
              alt=""
            />
          )}
        </div>
        <div className="grid">
          {place.addedPhotos?.[1] && (
            <Image
              src={place.addedPhotos[1]}
              onClick={() => setShowAllPhotos(true)}
              className="aspect-square cursor-pointer object-cover w-full"
              alt=""
            />
          )}
          <div className="overflow-hidden">
            {place.addedPhotos?.[2] && (
              <Image
                className="aspect-square cursor-pointer object-cover w-full relative top-2"
                src={place.addedPhotos[2]}
                alt=""
                onClick={() => setShowAllPhotos(true)}
              />
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
          />
        </svg>
        Show all photos
      </button>
    </div>
  );
};

export default PlaceGallery;
