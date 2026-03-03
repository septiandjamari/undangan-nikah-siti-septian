import { useState, useEffect } from "react";

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

function ModalDaftarUcapan({ messages, onClose }) {
  return (
    <div className="ucapan-modal-overlay" onClick={onClose}>
      <div className="ucapan-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ucapan-modal-header">
          <span className="ucapan-modal-title">Daftar Ucapan</span>
          <button className="ucapan-modal-close" onClick={onClose} aria-label="Tutup">✕</button>
        </div>
        <div className="ucapan-modal-list">
          {messages.map((m) => (
            <KartuUcapan key={m.id} {...m} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Page8KartuUcapan() {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ nama: "", ucapan: "", hadir: "hadir" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errMsg, setErrMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

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

          <button className="btn-gold" type="submit" disabled={status === "loading"} style={{ textAlign: "center", justifyContent: "center" }}>
            {status === "loading" ? "Mengirim…" : "Kirim Ucapan"}
          </button>
        </form>

        {/* List ucapan — maks 3 card */}
        {messages.length > 0 && (
          <div style={{ width: "90%", position: "relative" }}>            
            <div className="kartu-list">
              {messages.slice(0, 2).map((m) => (
                <KartuUcapan key={m.id} {...m} />
              ))}
            </div>
            <br />
            <div className="ucapan-list-header">
              {messages.length > 2 && (
                <button className="ucapan-chip" onClick={() => setModalOpen(true)}>
                  buka daftar ucapan
                </button>
              )}
            </div>
          </div>
        )}
        {messages.length === 0 && (
          <p className="meta" style={{ opacity: 0.5, fontSize: "clamp(12px,1.4vh,16px)" }}>
            Belum ada ucapan. Jadilah yang pertama!
          </p>
        )}
      </div>

      {modalOpen && (
        <ModalDaftarUcapan messages={messages} onClose={() => setModalOpen(false)} />
      )}
    </article>
  );
}
