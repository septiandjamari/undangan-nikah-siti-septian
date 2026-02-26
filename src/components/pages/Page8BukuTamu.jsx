import { useState, useEffect } from "react";

const SHARE_URL = window.location.href;
const WA_SHARE = `https://wa.me/?text=${encodeURIComponent("Hadir di undangan pernikahan Siti & Septian 🎉 " + SHARE_URL)}`;

function KartuUcapan({ nama, ucapan, hadir, createdAt }) {
  const hadirLabel = { hadir: "✓ Hadir", tidak: "✗ Tidak hadir", mungkin: "~ Mungkin hadir" };
  const date = new Date(createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  return (
    <div className="kartu-item">
      <div className="kartu-header">
        <span className="kartu-nama">{nama}</span>
        <span className="kartu-hadir">{hadirLabel[hadir] ?? hadir}</span>
      </div>
      <p className="kartu-ucapan">{ucapan}</p>
      <p className="kartu-date">{date}</p>
    </div>
  );
}

export default function Page8BukuTamu() {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ nama: "", ucapan: "", hadir: "hadir" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    fetch("/api/buku-tamu")
      .then((r) => r.json())
      .then((res) => { if (res.ok) setMessages(res.data); })
      .catch(() => {});
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");
    try {
      const res = await fetch("/api/add-buku-tamu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.message);
      setMessages((prev) => [json.data, ...prev]);
      setForm({ nama: "", ucapan: "", hadir: "hadir" });
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2500);
    } catch (err) {
      setErrMsg(err.message || "Gagal mengirim ucapan.");
      setStatus("error");
    }
  }

  return (
    <article className="canvas canvas--eight">
      <div className="buku-tamu-block">
        <p className="script buku-tamu-title">Kartu Ucapan</p>
        <br />
        <br />
        {/* Form */}
        <form className="buku-tamu-form" onSubmit={handleSubmit}>
          <input
            className="bt-input"
            type="text"
            placeholder="Nama kamu"
            value={form.nama}
            onChange={(e) => setForm((f) => ({ ...f, nama: e.target.value }))}
            required
            maxLength={60}
          />
          <textarea
            className="bt-input bt-textarea"
            placeholder="Tulis ucapan untuk mempelai..."
            value={form.ucapan}
            onChange={(e) => setForm((f) => ({ ...f, ucapan: e.target.value }))}
            required
            maxLength={280}
            rows={3}
          />
          <div className="bt-radio-group">
            {[["hadir", "Hadir"], ["tidak", "Tidak hadir"], ["mungkin", "Mungkin hadir"]].map(([val, label]) => (
              <label key={val} className="bt-radio">
                <input
                  type="radio"
                  name="hadir"
                  value={val}
                  checked={form.hadir === val}
                  onChange={() => setForm((f) => ({ ...f, hadir: val }))}
                />
                {label}
              </label>
            ))}
          </div>

          {status === "error" && <p className="bt-error">{errMsg}</p>}
          {status === "success" && <p className="bt-success">Ucapan terkirim! 🎉</p>}

          <button className="btn-gold" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Mengirim…" : "Kirim Ucapan"}
          </button>
        </form>

        {/* Share */}
        <a className="btn-outline" href={WA_SHARE} target="_blank" rel="noopener noreferrer">
          Bagikan Undangan via WhatsApp
        </a>

        {/* List ucapan */}
        {messages.length > 0 && (
          <div className="kartu-list">
            {messages.map((m) => (
              <KartuUcapan key={m.id} {...m} />
            ))}
          </div>
        )}
        {messages.length === 0 && (
          <p className="meta" style={{ opacity: 0.5, fontSize: "clamp(12px,1.4vh,16px)" }}>
            Belum ada ucapan. Jadilah yang pertama!
          </p>
        )}
      </div>
    </article>
  );
}
