import { useEffect } from "react";
import { useActivePanel } from "./hooks/useActivePanel";
import DotNav from "./components/DotNav";
import PageChip from "./components/PageChip";
import Page1Cover from "./components/pages/Page1Cover";
import Page2Salam from "./components/pages/Page2Salam";
import Page3Mempelai from "./components/pages/Page3Mempelai";
import Page4Akad from "./components/pages/Page4Akad";
import Page5Lokasi from "./components/pages/Page5Lokasi";
import Page6Countdown from "./components/pages/Page6Countdown";
import Page7Quotes from "./components/pages/Page7Quotes";
import Page8BukuTamu from "./components/pages/Page8BukuTamu";

const TOTAL = 8;

export default function App() {
  const { activeIndex, containerRef, scrollToPanel } = useActivePanel(TOTAL);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToPanel(activeIndex + 1);
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToPanel(activeIndex - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, scrollToPanel]);

  const panel = (i, label, children) => (
    <section
      key={i}
      className={`panel${activeIndex === i ? " is-active" : ""}`}
      id={`page-${i + 1}`}
      aria-label={`Halaman ${i + 1} – ${label}`}
    >
      {children}
    </section>
  );

  return (
    <>
      <main className="snap-stack" id="snapContainer" ref={containerRef}>
        {panel(0, "Cover",          <Page1Cover onOpen={() => scrollToPanel(1)} />)}
        {panel(1, "Salam",          <Page2Salam />)}
        {panel(2, "Mempelai",       <Page3Mempelai />)}
        {panel(3, "Akad Nikah",     <Page4Akad />)}
        {panel(4, "Lokasi",         <Page5Lokasi />)}
        {panel(5, "Menghitung Hari",<Page6Countdown />)}
        {panel(6, "Kutipan",        <Page7Quotes />)}
        {panel(7, "Buku Tamu",      <Page8BukuTamu />)}
      </main>

      <DotNav total={TOTAL} activeIndex={activeIndex} onDotClick={scrollToPanel} />
      <PageChip current={activeIndex + 1} total={TOTAL} />
    </>
  );
}
