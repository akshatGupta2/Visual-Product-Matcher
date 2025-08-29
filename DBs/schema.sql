-- schema.sql
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    local_path TEXT,
    embedding BLOB
);