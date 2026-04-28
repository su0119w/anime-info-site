const { DatabaseSync } = require("node:sqlite");
const path = require("node:path");

const dbPath = path.join(__dirname, "anime.db");
const db = new DatabaseSync(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS animes (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    image TEXT,
    description TEXT,
    genre TEXT,
    season TEXT,
    episodes INTEGER,
    status TEXT,
    platformId INTEGER,
    titleJp TEXT,
    releaseDate TEXT,
    studio TEXT,
    originalType TEXT,
    originalAuthor TEXT,
    mangaTitle TEXT,
    mangaStatus TEXT,
    officialSite TEXT,
    wikipedia TEXT,
    platformAnimeUrl TEXT
  )
`);

module.exports = db;
