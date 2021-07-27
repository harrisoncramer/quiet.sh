CREATE TABLE joke (
  body TEXT,
  reddit_id varchar(30),
  likes integer,
  opening varchar(300) NOT NULL
);
/* Copy data */
COPY joke (body, reddit_id, likes, opening)
from
  '/Users/harrisoncramer/Desktop/jokes.csv' DELIMITER ',' CSV HEADER;
