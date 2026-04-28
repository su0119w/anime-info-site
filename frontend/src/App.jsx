import { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import "./App.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

function AnimeDetailPage() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [platforms, setPlatforms] = useState([]);
  const [mangaVolumes, setMangaVolumes] = useState([]);
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/animes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAnime(data);
      });
  }, [id]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/platforms`)
      .then((res) => res.json())
      .then((data) => {
        setPlatforms(data);
      });
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/mangaVolumes`)
      .then((res) => res.json())
      .then((data) => {
        setMangaVolumes(data)
      })
  }, [])


  if (!anime) {
    return <p>載入中...</p>;
  }
  const mangaList = mangaVolumes.filter((item) => {
    return item.animeId === anime.id
  });

  const platform = platforms.find((item) => item.id === anime.platformId);

  return (
    <div>
      <header>
        <div className="Logo">
          <Link to="/">
            <img src="/images/su.png" alt="Logo" />
          </Link>
          <h1>動漫資訊站</h1>
        </div>
        <div>
          <Link to="/" className="back-link">
            返回首頁
          </Link>
        </div>
      </header>

      <div className="detailed">
        <div className="detailed-left">

          <h2>{anime.title}<span className="jptitle">日文:{anime.titleJp}</span></h2>
          <img src={anime.image} className="detail-image" alt={anime.title} />
        </div>

        <div className="detailed-right">
          <h3>詳細</h3>
          <p>{anime.description}</p>
          <p>類型：{anime.genre}</p>
          <p>季度：{anime.season}</p>
          <p>集數：{anime.episodes}</p>
          <p>狀態：{anime.status}</p>
          <p>播放平台：{platform ? platform.name : "載入中..."}</p>
          <p>首播日期:{anime.releaseDate}</p>
          <p>製作公司:{anime.studio}</p>
          <hr></hr>
          <h3>{anime.originalType}</h3>
          <p>作者:{anime.originalAuthor}</p>
          <p>狀態:{anime.mangaStatus}</p>


          <table className="manga-table">
            <thead>
              <tr>
                <th rowSpan={2}>集數</th>
                <th colSpan={2}>標題</th>
                <th colSpan={2}>發售日</th>
                <th rowSpan={2}>封面人物</th>
              </tr>
              <tr>
                <th>日文標題</th>
                <th>中文標題</th>
                <th>日本發售日</th>
                <th>台灣發售日</th>
              </tr>
            </thead>
            <tbody>
              {mangaList.map((item) => (
                <tr key={item.volume}>
                  <td>{item.volume}</td>
                  <td>{item.titleJp}</td>
                  <td>{item.titleTw}</td>
                  <td>{item.releaseDateJp}</td>
                  <td>{item.releaseDateTw}</td>
                  <td>{item.coverCharacter}</td>
                </tr>
              ))}
            </tbody>
          </table>


          <hr></hr>
          <h3>資料</h3>
          <div className="link-group">
            <p><a href={anime.officialSite} target="_blank" rel="noreferrer">{anime.title}官網</a></p>
            <p><a href={anime.wikipedia} target="_blank" rel="noreferrer">{anime.title}維基百科</a></p>
            <p><a href={anime.platformAnimeUrl} target="_blank" rel="noreferrer">{anime.title} 平台觀看</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const [animes, setAnimes] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/animes`)
      .then((res) => res.json())
      .then((data) => {
        setAnimes(data);
      });
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/platforms`)
      .then((res) => res.json())
      .then((data) => {
        setPlatforms(data);
      });
  }, []);

  const filteredAnimes = animes.filter((item) => item.title.includes(input) || input === "");

  return (
    <div>
      <header>
        <div className="Logo">
          <img src="/images/su.png" alt="Logo" />
          <h1>動漫資訊站</h1>
          <input
            placeholder="搜尋：例如鬼滅"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </header>

      <main>
        <section className="hero-section">
          <p className="hero-tag">2026 春季動畫整理</p>
          <h2>快速找到你想看的日本動畫</h2>
          <p>整理熱門動畫、播出季度與平台資訊，打造一個適合期末報告展示的動漫資訊網站。</p>
        </section>

        <section>
          <h2>收錄平台</h2>
          <div className="platforms-grid">
            {platforms.map((item) => (
              <article key={item.id}>
                <h3>
                  <a href={item.website} target="_blank" rel="noreferrer">
                    {item.name}
                  </a>
                </h3>
                <p>{item.price}</p>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2>動畫列表</h2>
          <div className="anime-grid">
            {filteredAnimes.map((item) => (
              <Link to={`/anime/${item.id}`} className="anime-link" key={item.id}>
                <article className="anime-card">
                  <div className="card-top">
                    <h3>{item.title}</h3>
                    <span className="status-tag">{item.status}</span>
                  </div>
                  <img src={item.image} className="anime-image" alt={item.title} />
                  <p>{item.description}</p>
                  <p>類型：{item.genre}</p>
                  <p>季度：{item.season}</p>
                  <p>集數：{item.episodes}</p>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/anime/:id" element={<AnimeDetailPage />} />
    </Routes>
  );
}

export default App;
