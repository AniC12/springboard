-- in terminal:
-- psql < craiglist.sql
-- psql craiglist_examle

DROP DATABASE IF EXISTS  craiglist_examle;

CREATE DATABASE craiglist_examle;

\c craiglist_examle


CREATE TABLE region (
  region_id SERIAL PRIMARY KEY,
  region_name TEXT NOT NULL
);

CREATE TABLE "user" (
  user_id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  preferred_region_id INTEGER REFERENCES region
);

CREATE TABLE category (
  category_id SERIAL PRIMARY KEY,
  category_name TEXT
);


CREATE TABLE post (
  post_id SERIAL PRIMARY KEY,
  title VARCHAR(20),
  text TEXT,
  user_id INTEGER REFERENCES "user",
  location TEXT,
  region_id INTEGER REFERENCES region,
  category_id INTEGER REFERENCES category
);


-- Inserting regions
INSERT INTO region (region_id, region_name)
VALUES (1, 'San Francisco'),
       (2, 'Atlanta'),
       (3, 'Seattle');

-- Inserting users
INSERT INTO "user" (user_id, username, preferred_region_id)
VALUES (1, 'user1', 1),
       (2, 'user2', 2);
       
-- Inserting categories
INSERT INTO category (category_id, category_name)
VALUES (1, 'Category 1'),
       (2, 'Category 2');


-- Inserting posts
INSERT INTO post (post_id, title, text, user_id, location, region_id, category_id)
VALUES (1, 'Item 1', 'Description 1', 1, 'Location 1', 1, 1),
       (2, 'Item 2', 'Description 2', 2, 'Location 2', 2, 2);
