# Airbnb Clone - Fullstack Booking Application

A fullstack booking application built using React, Node.js, Express, MongoDB, Tailwind CSS, and AWS SDK for S3 integration. This application allows users to register, log in, view their Airbnb listings, explore detailed information about each listing, and view all the photos associated with an Airbnb.

## Features

- User Registration and Login: Users must register and log in to add and manage their Airbnb listings.
- Airbnb Listings: Users can view their own Airbnb listings on the platform.
- Detailed Airbnb Information: Clicking on an Airbnb listing will display more information about the listing.
- Photo Gallery: Each Airbnb has a dedicated page to view all the associated photos.
- Account Page: Users can access their profile, bookings, and all the Airbnb listings they added from the account page (accessible through the profile icon in the header).
- AWS S3 Integration: Photos are uploaded to an AWS S3 bucket. Users can upload photos directly from their devices or provide links for upload.

## Technologies Used

The application utilizes the following technologies:

- Backend: Node.js, Express, MongoDB, JSON Web Tokens (JWT)
- Frontend: React, Tailwind CSS
- Cloud Storage: AWS SDK for S3

## Setup & Installation

Follow these steps to set up and run the Airbnb Clone application:

1. Clone the repository: `git clone https://github.com/your-username/airbnb-clone.git`
2. Install dependencies for the client side: `cd client && yarn`
3. Install dependencies for the server side: `cd server && yarn`
4. Rename the sample environment file in the server folder to `config.env` and the client's environment file to `.env`. Replace the placeholder values with your own configurations.
5. Start the client side: `cd client && yarn start`
6. Start the server side: `cd server && yarn dev`

## API Endpoints

The backend provides the following API endpoints:

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Log in existing users.
- `GET /api/places`: Get all Airbnb listings for a user.
- `POST /api/places`: Add an Airbnb listing.
- `PUT /api/places`: Update Airbnb listing.
- `GET /api/places/:id`: Get detailed information about a specific Airbnb listing.
- `POST /api/places/:id/photos`: Upload a photo for a specific Airbnb.
- `GET /api/places/:id/photos`: Get all photos for a specific Airbnb.
- `GET /api/users/:id/profile`: Get user profile and bookings information.

## Deployment

The Airbnb Clone application is deployed and accessible [here](https://ann-booking-app.vercel.app).

## License

This project is licensed under the [MIT License](link-to-license). Feel free to use, modify, and distribute the code as per the terms of the license.
