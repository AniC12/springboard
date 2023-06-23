-- from the terminal run:
-- psql < blogly.sql

DROP DATABASE IF EXISTS blogly;

CREATE DATABASE blogly;

--\c blogly

CREATE USER bloglyuser WITH PASSWORD 'bloglypassword';

ALTER DATABASE blogly OWNER TO bloglyuser;