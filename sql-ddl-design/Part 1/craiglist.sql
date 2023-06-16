CREATE TABLE Region (
  region_id INT PRIMARY KEY,
  region_name VARCHAR(255)
);

CREATE TABLE User (
  user_id INT PRIMARY KEY,
  username VARCHAR(255),
  preferred_region_id INT,
  FOREIGN KEY (preferred_region_id) REFERENCES Region(region_id)
);

CREATE TABLE Post (
  post_id INT PRIMARY KEY,
  title VARCHAR(255),
  text TEXT,
  user_id INT,
  location VARCHAR(255),
  region_id INT,
  FOREIGN KEY (user_id) REFERENCES User(user_id),
  FOREIGN KEY (region_id) REFERENCES Region(region_id)
);

CREATE TABLE Category (
  category_id INT PRIMARY KEY,
  category_name VARCHAR(255)
);

CREATE TABLE PostCategory (
  post_id INT,
  category_id INT,
  FOREIGN KEY (post_id) REFERENCES Post(post_id),
  FOREIGN KEY (category_id) REFERENCES Category(category_id)
);


-- Inserting regions
INSERT INTO Region (region_id, region_name)
VALUES (1, 'San Francisco'),
       (2, 'Atlanta'),
       (3, 'Seattle');

-- Inserting users
INSERT INTO User (user_id, username, preferred_region_id)
VALUES (1, 'user1', 1),
       (2, 'user2', 2);

-- Inserting posts
INSERT INTO Post (post_id, title, text, user_id, location, region_id)
VALUES (1, 'Item 1', 'Description 1', 1, 'Location 1', 1),
       (2, 'Item 2', 'Description 2', 2, 'Location 2', 2);

-- Inserting categories
INSERT INTO Category (category_id, category_name)
VALUES (1, 'Category 1'),
       (2, 'Category 2');
