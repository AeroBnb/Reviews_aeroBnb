DROP DATABASE IF EXISTS SDC;
CREATE DATABASE SDC;
USE SDC;

CREATE TABLE Listings (
  l_id SERIAL PRIMARY KEY
);

CREATE TABLE Users (
  u_id SERIAL PRIMARY KEY,
  username TEXT,
  display_name TEXT,
  photo_url TEXT,
  profile_url TEXT
);

CREATE TABLE Bookings (
  b_id SERIAL PRIMARY KEY,
  listing_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  stay_start DATE,
  stay_end DATE
);

CREATE TABLE Reviews (
  r_id SERIAL PRIMARY KEY,
  booking_id INTEGER NOT NULL,
  review_date DATE,
  review_text TEXT,
  accuracy SMALLINT,
  communication SMALLINT,
  cleanliness SMALLINT,
  location SMALLINT,
  checkin SMALLINT,
  value SMALLINT
);