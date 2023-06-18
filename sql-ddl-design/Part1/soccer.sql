-- in terminal:
-- psql < soccer.sql
-- psql soccer_league

DROP DATABASE IF EXISTS  soccer_league;

CREATE DATABASE soccer_league;

\c soccer_league

CREATE TABLE team (
  team_id SERIAL PRIMARY KEY,
  team_name TEXT
);

CREATE TABLE player (
  player_id SERIAL PRIMARY KEY,
  player_name TEXT,
  team_id INTEGER REFERENCES team
);

CREATE TABLE referee (
  referee_id SERIAL PRIMARY KEY,
  referee_name TEXT
);


CREATE TABLE match (
  match_id SERIAL PRIMARY KEY,
  home_team_id INTEGER REFERENCES team,
  away_team_id INTEGER REFERENCES team,
  referee_id INTEGER REFERENCES referee,
  match_date DATE
);


CREATE TABLE goal (
  goal_id SERIAL PRIMARY KEY,
  player_id INTEGER REFERENCES player,
  match_id INTEGER REFERENCES match
);


CREATE TABLE season (
  season_id SERIAL PRIMARY KEY,
  start_date DATE,
  end_date DATE
);


-- Inserting teams
INSERT INTO team (team_id, team_name)
VALUES (1, 'Team A'),
       (2, 'Team B'),
       (3, 'Team C');

-- Inserting players
INSERT INTO player (player_id, player_name, team_id)
VALUES (1, 'Player 1', 1),
       (2, 'Player 2', 1),
       (3, 'Player 3', 2),
       (4, 'Player 4', 3);

-- Inserting referees
INSERT INTO referee (referee_id, referee_name)
VALUES (1, 'Referee A'),
       (2, 'Referee B');

-- Inserting games
INSERT INTO match (match_id, home_team_id, away_team_id, referee_id, match_date)
VALUES (1, 1, 2, 1, '2023-06-01'),
       (2, 3, 1, 2, '2023-06-03');

-- Inserting goals
INSERT INTO goal (goal_id, player_id, match_id)
VALUES (1, 1, 1),
       (2, 3, 1),
       (3, 2, 2);

-- Inserting seasons
INSERT INTO season (season_id, start_date, end_date)
VALUES (1, '2023-01-01', '2023-12-31');