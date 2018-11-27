COPY listings
FROM '/Users/indu/Documents/Galvanize/HRNYC18/SDC_Project/Reviews_aeroBnb/build-csv/listings.csv' 
WITH (HEADER false, DELIMITER E'\t');

COPY reviews
FROM '/Users/indu/Documents/Galvanize/HRNYC18/SDC_Project/Reviews_aeroBnb/build-csv/reviews.csv' 
WITH (HEADER false, DELIMITER E'\t');

COPY users
FROM '/Users/indu/Documents/Galvanize/HRNYC18/SDC_Project/Reviews_aeroBnb/build-csv/users.csv' 
WITH (HEADER false, DELIMITER E'\t');

ALTER DATABASE sdcknex SET search_path = sdcknex, public;

ALTER SEQUENCE reviews_r_id_seq 
RESTART WITH 10000001;

ALTER SEQUENCE listings_l_id_seq 
RESTART WITH 10000001;

ALTER SEQUENCE users_id_seq 
RESTART WITH 1000001;

CREATE INDEX listing_index 
ON reviews (listings_id);

CREATE INDEX user_index
ON reviews (user_id);
