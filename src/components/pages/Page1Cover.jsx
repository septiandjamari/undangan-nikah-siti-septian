export default function Page1Cover({ onOpen }) {
  return (
    <article className="canvas canvas--one">
      <p className="meta" style={{ letterSpacing: "0.22em" }}>
        Undangan Pernikahan<br />Dari:
      </p>

      <div className="cover">
        <p className="script cover-script">
          <span>Siti</span><br />
          <span>Septian</span>
        </p>

        <div className="cover-guest">
          <p className="meta" style={{ letterSpacing: "0.14em" }}>Kepada Yth:</p>
          <p className="meta" style={{ letterSpacing: "0.14em" }}>Bapak/Ibu/Saudara/i</p>
          <p className="meta guest-name">Nama Tamu</p>
          <p className="meta" style={{ letterSpacing: "0.14em" }}>Di Tempat</p>
        </div>

        <button className="btn-gold" onClick={onOpen}>
          Buka Undangan
        </button>
      </div>
    </article>
  );
}
