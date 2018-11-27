DROP DATABASE IF EXISTS sdcknex;
CREATE DATABASE sdcknex;
\c sdcknex;

DROP TABLE IF EXISTS Listings;

CREATE TABLE Listings (
  l_id SERIAL PRIMARY KEY,
  address TEXT
);

DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  username TEXT,
  display_name TEXT,
  photo_url TEXT,
  profile_url TEXT
);

DROP TABLE IF EXISTS Reviews;

CREATE TABLE Reviews (
  r_id SERIAL PRIMARY KEY,
  listings_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  review_date DATE,
  reviews TEXT,
  accuracy SMALLINT,
  communication SMALLINT,
  cleanliness SMALLINT,
  location SMALLINT,
  check_in SMALLINT,
  value SMALLINT
);