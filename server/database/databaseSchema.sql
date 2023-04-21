DROP DATABASE tabisho;
CREATE DATABASE tabisho;

\c tabisho;

CREATE TABLE IF NOT EXISTS Users (
_id SERIAL PRIMARY KEY,
first_name TEXT NOT NULL,
last_name TEXT NOT NULL,
picture TEXT,
email VARCHAR(320) NOT NULL
);

CREATE TABLE IF NOT EXISTS Trips (
_id SERIAL PRIMARY KEY,
organizer_id INT NOT NULL,
name TEXT,
start_date NUMERIC,
end_date NUMERIC,
description TEXT,
CONSTRAINT fk_organizer
  FOREIGN KEY(organizer_id)
  REFERENCES Users(_id)
);

CREATE INDEX trip_indexes
ON Trips (organizer_id);

CREATE TABLE IF NOT EXISTS Events (
_id SERIAL PRIMARY KEY,
trip_id INT NOT NULL,
name TEXT,
start_date NUMERIC,
end_date NUMERIC,
description TEXT,
CONSTRAINT fk_trip
  FOREIGN KEY(trip_id)
  REFERENCES Trips(_id)
);

CREATE INDEX event_indexes
ON Events (trip_id);

CREATE TABLE IF NOT EXISTS Housing (
_id SERIAL PRIMARY KEY,
trip_id INT NOT NULL,
name TEXT,
photo TEXT,
link TEXT,
description TEXT,
CONSTRAINT fk_trip
  FOREIGN KEY(trip_id)
  REFERENCES Trips(_id)
);

CREATE INDEX housing_indexes
ON Housing (trip_id);

CREATE TABLE IF NOT EXISTS UserTrips (
_id SERIAL PRIMARY KEY,
trip_id INT NOT NULL,
user_id INT NOT NULL,
attending TEXT,
CONSTRAINT fk_trip
  FOREIGN KEY(trip_id)
  REFERENCES Trips(_id),
CONSTRAINT fk_user
  FOREIGN KEY(user_id)
  REFERENCES Users(_id)
);

CREATE TABLE IF NOT EXISTS UserEvents (
_id SERIAL PRIMARY KEY,
event_id INT NOT NULL,
user_id INT NOT NULL,
attending TEXT,
CONSTRAINT fk_event
  FOREIGN KEY(event_id)
  REFERENCES EVents(_id),
CONSTRAINT fk_user
  FOREIGN KEY(user_id)
  REFERENCES Users(_id)
);

CREATE TABLE IF NOT EXISTS Friends (
_id SERIAL PRIMARY KEY,
user_id INT NOT NULL,
friend_id INT NOT NULL,
CONSTRAINT fk_user
  FOREIGN KEY(user_id)
  REFERENCES Users(_id),
CONSTRAINT fk_friend
  FOREIGN KEY(friend_id)
  REFERENCES Users(_id)
);


