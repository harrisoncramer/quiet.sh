CREATE TABLE users (
  github_id integer NOT NULL PRIMARY KEY,
  login varchar(100) NOT NULL,
  avatar_url varchar(100),
  repos_url varchar(100) NOT NULL,
  token varchar(75)
);

CREATE TABLE reports (
  report_id SERIAL PRIMARY KEY,
  repo_id integer,
  user_id integer REFERENCES users(github_id),
  description text,
  full_name varchar(50),
  html_url varchar(100),
  is_gitleaks boolean,
  number_of_secrets integer,
  time_of_execution timestamp,
  is_exposed boolean DEFAULT false,
  exposed_count integer DEFAULT 0
)
