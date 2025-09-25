CREATE TABLE IF NOT EXISTS songs (
  id VARCHAR(50) PRIMARY KEY,
  title TEXT NOT NULL,
  year INT NOT NULL,
  performer TEXT NOT NULL,
  genre TEXT,
  duration INT,
  album_id VARCHAR(50) REFERENCES albums(id) ON DELETE CASCADE
);
