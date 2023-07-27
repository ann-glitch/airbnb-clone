# airbnb-clone

> a node/react fullstack booking application built with react, node, tailwindcss, mongodb and aws-sdk/client-s3.

## features

- To add an airbnb, a user must register and log in.
- A user's Airbnb listings are displayed.
- Each airbnb when clicked on moves you to a page with more information about it.
- A page is dedicated to viewing all the photos of the said airbnb.
- A user's acccount account page shows their profile, bookings and all airbnbs they added.(You can find this in the profile icon on the header side).
- Photos are uploaded to aws s3 bucket. (You can upload photo directly from your device or via a link).

## setup & installation

```
yarn && yarn start (on the client side).
yarn && yarn dev (on the server side).
```

## .env files

Change the sample.env file in the server folder to config.env and the client's own to .env and replace the values with your own values.

---

[Live Site](https://ann-booking-app.vercel.app)
