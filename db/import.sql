CREATE TABLE users (
  github_id integer NOT NULL PRIMARY KEY,
  login varchar(100) NOT NULL,
  avatar_url varchar(100),
  repos_url varchar(100) NOT NULL,
  token varchar(75)
);
CREATE TABLE reports (
  id integer,
  description text,
  full_name varchar(50),
  html_url varchar(100),
  user_id integer REFERENCES users(github_id),
  is_gitleaks boolean,
  number_of_secrets integer,
  time_of_execution date
)
