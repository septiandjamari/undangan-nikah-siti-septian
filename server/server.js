import express from "express";
import cors from "cors";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, "buku-tamu.json");
const TAMU_PATH = join(__dirname, "tamu-undangan.json");
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

// GET /api/tamu-undangan — ambil semua tamu undangan
app.get("/api/tamu-undangan", (_req, res) => {
  if (!existsSync(TAMU_PATH)) writeFileSync(TAMU_PATH, "[]");
  const data = JSON.parse(readFileSync(TAMU_PATH, "utf-8"));
  res.json({ ok: true, data });
});

// POST /api/tamu-undangan — tambah tamu undangan baru
app.post("/api/tamu-undangan", (req, res) => {
  const { nama, telepon } = req.body;

  if (!nama?.trim()) {
    return res.status(400).json({ ok: false, message: "Nama wajib diisi." });
  }

  if (!existsSync(TAMU_PATH)) writeFileSync(TAMU_PATH, "[]");
  const data = JSON.parse(readFileSync(TAMU_PATH, "utf-8"));

  const entry = {
    id: Date.now().toString(),
    nama: nama.trim(),
    telepon: telepon?.trim() ?? "",
    createdAt: new Date().toISOString(),
  };

  data.push(entry);
  writeFileSync(TAMU_PATH, JSON.stringify(data, null, 2));
  res.json({ ok: true, data: entry });
});

// PATCH /api/tamu-undangan/:id — update nama/telepon
app.patch("/api/tamu-undangan/:id", (req, res) => {
  if (!existsSync(TAMU_PATH)) return res.status(404).json({ ok: false });
  const data = JSON.parse(readFileSync(TAMU_PATH, "utf-8"));
  const idx = data.findIndex((t) => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ ok: false });
  const { nama, telepon } = req.body;
  if (nama !== undefined) data[idx].nama = nama.trim();
  if (telepon !== undefined) data[idx].telepon = telepon.trim();
  writeFileSync(TAMU_PATH, JSON.stringify(data, null, 2));
  res.json({ ok: true, data: data[idx] });
});

// DELETE /api/tamu-undangan/:id — hapus tamu undangan
app.delete("/api/tamu-undangan/:id", (req, res) => {
  if (!existsSync(TAMU_PATH)) return res.json({ ok: true });
  const data = JSON.parse(readFileSync(TAMU_PATH, "utf-8"));
  const filtered = data.filter((t) => t.id !== req.params.id);
  writeFileSync(TAMU_PATH, JSON.stringify(filtered, null, 2));
  res.json({ ok: true });
});

// Di production: semua route lain fallback ke index.html (SPA routing)
if (IS_PROD) {
  app.get("*", (_req, res) => {
    res.sendFile(join(DIST_PATH, "index.html"));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
