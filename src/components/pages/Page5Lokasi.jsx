export default function Page5Lokasi() {
  return (
    <article className="canvas canvas--five">
      <div className="lokasi-block">
        <div className="map-frame">
          <iframe
            src="https://maps.google.com/maps?q=RM.+Lombok+Abang,+Jl.+WR.+Supratman+No.95,+Cimuning,+Mustika+Jaya,+Bekasi&output=embed"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Akad Nikah"
          />
        </div>

        <p className="meta lokasi-venue">RM. Lombok Abang</p>
        <p className="meta lokasi-address">Jl. WR. Supratman No.95, Cimuning,<br />Mustika Jaya, Bekasi 17155</p>

        <a
          className="btn-outline"
          href="https://maps.app.goo.gl/xzSAWot44htkhEfa9"
          target="_blank"
          rel="noopener noreferrer"
        >
          Petunjuk Ke Lokasi
        </a>
      </div>
    </article>
  );
}
