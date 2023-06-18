-- from the terminal run:
-- psql < air_traffic.sql

DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic

CREATE TABLE passengers
(
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

CREATE TABLE airlines
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE countries
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE cities
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  country_id INTEGER REFERENCES countries
);

CREATE TABLE tickets
(
  id SERIAL PRIMARY KEY,
  seat TEXT NOT NULL,
  passenger_id INTEGER REFERENCES passengers,
  departure TIMESTAMP NOT NULL,
  arrival TIMESTAMP NOT NULL,
  airline_id INTEGER REFERENCES airlines,
  from_city_id INTEGER REFERENCES cities,
  to_city_id INTEGER REFERENCES cities
);



INSERT INTO passengers
  (first_name, last_name)
VALUES
  ('Jennifer', 'Finch'),
  ('Thadeus', 'Gathercoal'),
  ('Sonja', 'Pauley'),
  ('Waneta', 'Skeleton'),
  ('Berkie', 'Wycliff'),
  ('Alvin', 'Leathes'),
  ('Cory', 'Squibbes');

INSERT INTO airlines
  (name)
VALUES
  ('United'), ('British Airways'), ('Delta'), ('TUI Fly Belgium'), ('Air China'), ('American Airlines'), ('Avianca Brasil');

INSERT INTO countries
  (name)
VALUES
  ('United States'), ('Mexico'), ('France'), ('Morocco'), ('UAE'), ('China'), ('Brazil'), ('Chile'), ('Japan'), ('United Kingdom');

INSERT INTO cities
  (name, country_id)
VALUES
  ('Washington DC', 1),
  ('Seattle', 1), 
  ('Tokyo', 9), 
  ('London', 10), 
  ('Los Angeles', 1), 
  ('Las Vegas', 1), 
  ('Mexico City', 2), 
  ('Paris', 3), 
  ('Casablanca', 4), 
  ('Dubai', 5), 
  ('Beijing', 6),
  ('New York', 1),
  ('Charlotte', 1),
  ('Cedar Rapids', 1),
  ('Chicago', 1),
  ('New Orleans', 1),
  ('Sao Paolo', 7),
  ('Santiago', 8);


INSERT INTO tickets
  (seat, passenger_id, departure, arrival, airline_id, from_city_id, to_city_id)
VALUES
  ('33B', 1, '2018-04-08 09:00:00', '2018-04-08 12:00:00', 1, 1, 2),
  ('8A', 2, '2018-12-19 12:45:00', '2018-12-19 16:15:00', 2, 3, 4),
  ('12F', 3, '2018-01-02 07:00:00', '2018-01-02 08:03:00', 3, 5, 6),
  ('20A', 1, '2018-04-15 16:50:00', '2018-04-15 21:00:00', 3, 2, 7),
  ('23D', 4, '2018-08-01 18:30:00', '2018-08-01 21:50:00', 4, 8, 9),
  ('18C', 2, '2018-10-31 01:15:00', '2018-10-31 12:55:00', 5, 10, 11),
  ('9E', 5, '2019-02-06 06:00:00', '2019-02-06 07:47:00', 1, 12, 13),
  ('1A', 6, '2018-12-22 14:42:00', '2018-12-22 15:56:00', 6, 14, 15),
  ('32B', 5, '2019-02-06 16:28:00', '2019-02-06 19:18:00', 6, 13, 16),
  ('10D', 7, '2019-01-20 19:30:00', '2019-01-20 22:45:00', 7, 17, 18);
