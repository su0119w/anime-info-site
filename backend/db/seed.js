const db = require("./database");
const animes = require("../data/animes");

db.exec("DELETE FROM animes");

const insertAnime = db.prepare(`
  INSERT INTO animes (id, title, image, description, genre, season, episodes, status, platformId)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

for (const anime of animes) {
  insertAnime.run(
    anime.id,
    anime.title,
    anime.image,
    anime.description,
    anime.genre,
    anime.season,
    anime.episodes,
    anime.status,
    anime.platformId
  );
}

console.log("動畫資料已成功寫入資料庫");
