CREATE TABLE Team (
  team_id INT PRIMARY KEY,
  team_name VARCHAR(255)
);

CREATE TABLE Player (
  player_id INT PRIMARY KEY,
  player_name VARCHAR(255),
  team_id INT,
  FOREIGN KEY (team_id) REFERENCES Team(team_id)
);

CREATE TABLE Goal (
  goal_id INT PRIMARY KEY,
  player_id INT,
  game_id INT,
  FOREIGN KEY (player_id) REFERENCES Player(player_id),
  FOREIGN KEY (game_id) REFERENCES Game(game_id)
);

CREATE TABLE Referee (
  referee_id INT PRIMARY KEY,
  referee_name VARCHAR(255)
);

CREATE TABLE Game (
  game_id INT PRIMARY KEY,
  home_team_id INT,
  away_team_id INT,
  referee_id INT,
  game_date DATE,
  FOREIGN KEY (home_team_id) REFERENCES Team(team_id),
  FOREIGN KEY (away_team_id) REFERENCES Team(team_id),
  FOREIGN KEY (referee_id) REFERENCES Referee(referee_id)
);

CREATE TABLE Season (
  season_id INT PRIMARY KEY,
  start_date DATE,
  end_date DATE
);


-- Inserting teams
INSERT INTO Team (team_id, team_name)
VALUES (1, 'Team A'),
       (2, 'Team B'),
       (3, 'Team C');

-- Inserting players
INSERT INTO Player (player_id, player_name, team_id)
VALUES (1, 'Player 1', 1),
       (2, 'Player 2', 1),
       (3, 'Player 3', 2),
       (4, 'Player 4', 3);

-- Inserting referees
INSERT INTO Referee (referee_id, referee_name)
VALUES (1, 'Referee A'),
       (2, 'Referee B');

-- Inserting games
INSERT INTO Game (game_id, home_team_id, away_team_id, referee_id, game_date)
VALUES (1, 1, 2, 1, '2023-06-01'),
       (2, 3, 1, 2, '2023-06-03');

-- Inserting goals
INSERT INTO Goal (goal_id, player_id, game_id)
VALUES (1, 1, 1),
       (2, 3, 1),
       (3, 2, 2);

-- Inserting seasons
INSERT INTO Season (season_id, start_date, end_date)
VALUES (1, '2023-01-01', '2023-12-31');