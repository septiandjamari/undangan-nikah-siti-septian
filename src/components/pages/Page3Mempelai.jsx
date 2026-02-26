function PersonCard({ name, role, parents }) {
  return (
    <div className="person-card">
      <div className="person-avatar" aria-hidden="true" />
      <p className="script person-name">{name}</p>
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
          role="Putri"
          parents="Bapak <br />&amp; Ibu Hj Zuliah Hoesin"
        />
        <p className="script amp-sep">&amp;</p>
        <PersonCard
          name="Septian Djamari Chaniaco"
          role="Putra"
          parents="Bapak Slamet Untung (ALM)<br />&amp; Ibu Dwi Heni Wulyandari"
        />
      </div>
    </article>
  );
}
