const express = require("express");
const db = require("./db/database");
const platforms = require("./data/platforms");
const mangaVolumes=require("./data/mangaVolumes");

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  "http://127.0.0.1:5173",
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());

app.get("/api/animes", (req, res) => {
  const rows = db.prepare("SELECT * FROM animes").all();
  res.json(rows);
});

app.get("/api/animes/:id", (req, res) => {
  const animeId = Number(req.params.id);
  const anime = db.prepare("SELECT * FROM animes WHERE id = ?").get(animeId);

  if (!anime) {
    return res.status(404).json({
      success: false,
      message: "找不到這部動畫",
    });
  }

  res.json(anime);
});

app.get("/api/platforms", (req, res) => {
  res.json(platforms);
});

app.get("/api/mangaVolumes",(req,res)=>{
  res.json(mangaVolumes);
})

app.post("/api/animes", (req, res) => {
  const { title, image, description, genre, season, episodes, 
    status, platformId, titleJp, releaseDate, studio,originalType,
    originalAuthor,mangaTitle,mangaStatus,officialSite,wikipedia,
    platformAnimeUrl } = req.body;

  const result = db.prepare(`
    INSERT INTO animes (title, image, description, genre, season, episodes, 
    status, platformId, titleJp, releaseDate, studio,originalType,
    originalAuthor,mangaTitle,mangaStatus,officialSite,wikipedia,
    platformAnimeUrl)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?,?,?)
  `).run(title, image, description, genre, season, episodes, 
    status, platformId, titleJp, releaseDate, studio,originalType,
    originalAuthor,mangaTitle,mangaStatus,officialSite,wikipedia,
    platformAnimeUrl);

  const anime = db.prepare("SELECT * FROM animes WHERE id = ?").get(result.lastInsertRowid);

  res.status(201).json({
    success: true,
    message: "新增動畫成功",
    data: anime,
  });
});

app.put("/api/animes/:id", (req, res) => {
  const animeId = Number(req.params.id);
  const anime = db.prepare("SELECT * FROM animes WHERE id = ?").get(animeId);

  if (!anime) {
    return res.status(404).json({
      success: false,
      message: "找不到這部動畫",
    });
  }

  const { title, image, description, genre, season, episodes, 
    status, platformId, titleJp, releaseDate, studio,originalType,
    originalAuthor,mangaTitle,mangaStatus,officialSite,wikipedia,
    platformAnimeUrl} = req.body;

  db.prepare(`
    UPDATE animes
    SET title = ?, image = ?, description = ?, genre = ?, season = ?, episodes = ?, status = ?, platformId = ?,
    titleJp = ?, releaseDate = ?, studio = ?, originalType = ?, originalAuthor = ?, mangaTitle = ?,
    mangaStatus = ?, officialSite = ?, wikipedia = ?, platformAnimeUrl = ?
    WHERE id = ?
  `).run(
  title,
  image,
  description,
  genre,
  season,
  episodes,
  status,
  platformId,
  titleJp,
  releaseDate,
  studio,
  originalType,
  originalAuthor,
  mangaTitle,
  mangaStatus,
  officialSite,
  wikipedia,
  platformAnimeUrl,
  animeId
);


  const updatedAnime = db.prepare("SELECT * FROM animes WHERE id = ?").get(animeId);

  res.json({
    success: true,
    message: "修改動畫成功",
    data: updatedAnime,
  });
});

app.delete("/api/animes/:id", (req, res) => {
  const animeId = Number(req.params.id);
  const anime = db.prepare("SELECT * FROM animes WHERE id = ?").get(animeId);

  if (!anime) {
    return res.status(404).json({
      success: false,
      message: "找不到這部動畫",
    });
  }

  db.prepare("DELETE FROM animes WHERE id = ?").run(animeId);

  res.json({
    success: true,
    message: "刪除動畫成功",
    data: anime,
  });
});

app.listen(PORT, () => {
  console.log(`後端伺服器已啟動：http://localhost:${PORT}`);
});
