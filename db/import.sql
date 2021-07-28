CREATE TABLE users (
  github_id integer NOT NULL PRIMARY KEY,
  login varchar(100) NOT NULL,
  avatar_url varchar(100),
  repos_url varchar(100) NOT NULL,
  token varchar(75)
);
