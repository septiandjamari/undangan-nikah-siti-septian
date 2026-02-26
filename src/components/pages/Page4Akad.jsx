export default function Page4Akad() {
  return (
    <article className="canvas canvas--four">
      <div className="akad-block">
        <p className="script akad-title">Akad Nikah</p>

        <div className="date-row">
          <p className="meta date-day">Minggu</p>
          <div className="date-vline" aria-hidden="true" />
          <div>
            <p className="date-num">05</p>
            <p className="meta date-year">2026</p>
          </div>
          <div className="date-vline" aria-hidden="true" />
          <p className="meta date-month">April</p>
        </div>

        <p className="meta akad-time">Pukul 08.00 WIB</p>

        <p className="meta akad-location-label">Lokasi Acara</p>
        <p className="meta akad-venue">
          Bekasi<br />(Kampung Lombok)
        </p>
        <p className="meta akad-address">Jl. Mulawarman, Manggar</p>
      </div>
    </article>
  );
}
