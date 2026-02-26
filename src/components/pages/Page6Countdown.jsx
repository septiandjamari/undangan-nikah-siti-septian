import { useCountdown } from "../../hooks/useCountdown";

// Minggu 5 April 2026, 08.00 WIB (UTC+7)
const WEDDING_DATE = "2026-04-05T08:00:00+07:00";

function Box({ num, label }) {
  return (
    <div className="countdown-box">
      <span className="countdown-num">{num}</span>
      <span className="meta countdown-label">{label}</span>
    </div>
  );
}

export default function Page6Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);

  return (
    <article className="canvas canvas--six">
      <div className="countdown-block">
        <p className="script countdown-title">Menghitung Hari</p>
        <br />
        <br />
        <div className="countdown-grid">
          <Box num={days}    label="Hari" />
          <Box num={hours}   label="Jam" />
          <Box num={minutes} label="Menit" />
          <Box num={seconds} label="Detik" />
        </div>

        <p className="meta rsvp-text">
          Kirim ucapan untuk mempelai<br />
          dan konfirmasi kehadiran
        </p>

        <a
          className="btn-gold"
          href="https://wa.me/628123456789?text=Assalamu%27alaikum%2C+selamat+atas+pernikahan+Siti+%26+Septian"
          target="_blank"
          rel="noopener noreferrer"
        >
          Kirim Ucapan RSVP
        </a>
      </div>
    </article>
  );
}
