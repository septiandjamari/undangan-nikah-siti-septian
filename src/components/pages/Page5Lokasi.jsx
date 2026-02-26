export default function Page5Lokasi() {
  return (
    <article className="canvas canvas--five">
      <div className="lokasi-block">
        <div className="map-frame">
          <iframe
            src="https://maps.google.com/maps?q=Kampung+Lombok,+Bekasi&output=embed"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Akad Nikah"
          />
        </div>

        <p className="meta lokasi-venue">Bekasi (Kampung Lombok)</p>
        <p className="meta lokasi-address">Jl. Mulawarman, Manggar</p>

        <a
          className="btn-outline"
          href="https://maps.google.com/maps?q=Kampung+Lombok,+Bekasi"
          target="_blank"
          rel="noopener noreferrer"
        >
          Petunjuk Ke Lokasi
        </a>
      </div>
    </article>
  );
}
