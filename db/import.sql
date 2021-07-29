CREATE TABLE users (
  github_id integer NOT NULL PRIMARY KEY,
  login varchar(100) NOT NULL,
  avatar_url varchar(100),
  repos_url varchar(100) NOT NULL,
  token varchar(75)
);
CREATE TABLE reports (
  time_of_execution date,
  number_of_secrets integer,
  full_name varchar(50),
  html_url varchar(100),
  description text,
  is_gitleaks boolean,
  user_id integer REFERENCES users(github_id)
)
