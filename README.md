# 動漫資訊站

這是一個以日本動畫資訊整理為主題的全端練習專案，也是期末作品主線。

## 功能
- 動畫首頁列表
- 關鍵字搜尋
- 動畫詳細頁
- 串流平台資訊
- 動畫 CRUD API
- SQLite 資料庫

## 技術
- Frontend: React + Vite + React Router
- Backend: Node.js + Express
- Database: SQLite

## 專案結構
- `/frontend`：前端網站
- `/backend`：後端 API
- `/docs`：規劃與資料欄位文件

## 本機開發

### 前端
```powershell
cd frontend
npm install
npm run dev
```

### 後端
```powershell
cd backend
npm install
npm run seed
npm start
```

## 環境變數

### 前端
請參考 [frontend/.env.example](E:/web/projects/動漫資訊站/frontend/.env.example)

### 後端
請參考 [backend/.env.example](E:/web/projects/動漫資訊站/backend/.env.example)

## 目前 API
- `GET /api/animes`
- `GET /api/animes/:id`
- `GET /api/platforms`
- `POST /api/animes`
- `PUT /api/animes/:id`
- `DELETE /api/animes/:id`
