import express from "express";
import cors from "cors";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, "buku-tamu.json");
const DIST_PATH = join(__dirname, "../build");
const IS_PROD = process.env.NODE_ENV === "production";

const app = express();
app.use(cors());
app.use(express.json());

// Di production: serve static build Vite dari dist/
if (IS_PROD) {
  app.use(express.static(DIST_PATH));
}

function readDB() {
  if (!existsSync(DB_PATH)) writeFileSync(DB_PATH, "[]");
  return JSON.parse(readFileSync(DB_PATH, "utf-8"));
}

function writeDB(data) {
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// GET /api/buku-tamu — ambil semua pesan, terbaru di atas
app.get("/api/buku-tamu", (_req, res) => {
  const data = readDB();
  res.json({ ok: true, data: [...data].reverse() });
});

// POST /api/add-buku-tamu — tambah pesan baru
app.post("/api/add-buku-tamu", (req, res) => {
  const { nama, ucapan, hadir } = req.body;

  if (!nama?.trim() || !ucapan?.trim()) {
    return res.status(400).json({ ok: false, message: "Nama dan ucapan wajib diisi." });
  }

  const entry = {
    id: Date.now().toString(),
    nama: nama.trim(),
    ucapan: ucapan.trim(),
    hadir: hadir ?? "mungkin",
    createdAt: new Date().toISOString(),
  };

  const data = readDB();
  data.push(entry);
  writeDB(data);

  res.json({ ok: true, data: entry });
});

// Di production: semua route lain fallback ke index.html (SPA routing)
if (IS_PROD) {
  app.get("*", (_req, res) => {
    res.sendFile(join(DIST_PATH, "index.html"));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
