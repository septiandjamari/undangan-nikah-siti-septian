function PersonCard({ name, role, parents }) {
  return (
    <div className="person-card">
      <div className="person-avatar" aria-hidden="true" />
      <p className="script person-name">{name}</p>
      <br />
      <p className="meta person-role">{role}</p>
      <p className="meta person-parents" dangerouslySetInnerHTML={{ __html: parents }} />
    </div>
  );
}

export default function Page3Mempelai() {
  return (
    <article className="canvas canvas--three">
      <div className="mempelai-block">
        <PersonCard
          name="Siti Saodatul Ashari"
          role="Putri ke-4"
          parents="Bapak Jahidin<br />&amp; Ibu Nuraenah (Almh)"
        />
        <p className="script amp-sep">&amp;</p>
        <PersonCard
          name="Septian Djamari Chaniaco"
          role="Putra ke-2"
          parents="Bapak Slamet Untung (Alm)<br />&amp; Ibu Dwi Heni Wulyandari"
        />
      </div>
    </article>
  );
}
