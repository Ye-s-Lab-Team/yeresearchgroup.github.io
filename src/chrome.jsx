/* Shared chrome: Nav + Footer + Page shell + reveal helper */

function useReveal() {
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {e.target.classList.add('in');io.unobserve(e.target);}
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function getCurrentSemester() {
  const now = new Date();

  const month = now.getMonth() + 1; // 1-12
  const year = now.getFullYear();

  if (month >= 1 && month <= 5) {
    return `Spring ${year}`;
  }

  if (month >= 6 && month <= 8) {
    return `Summer ${year}`;
  }

  if (month >= 9 && month <= 12) {
    return `Fall ${year}`;
  }

  return `Winter ${year}`;
}

function getBuildDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
}

function Nav({ current, onNav }) {
  const links = [
  ["home", "Home", "00"],
  ["research", "Research", "01"],
  ["members", "Members", "02"],
  ["publications", "Publications", "03"],
  ["news", "News", "04"],
  ["awards", "Awards", "05"],
  ["gallery", "Gallery", "06"]];

  return (
    <header className="nav">
      <div className="container">
        <div className="nav-inner">
          <a className="brand" href="#home" onClick={(e) => {e.preventDefault();onNav('home');}}>
            <span className="brand-mark">Ye's Research Group</span>
            <span className="brand-sub">@ Colorado School of Mines</span>
          </a>
          <nav className="navlinks">
            {links.map(([id, label, idx]) =>
            <a key={id}
            href={`#${id}`}
            className={current === id ? 'active' : ''}
            onClick={(e) => {e.preventDefault();onNav(id);}}>
                <span>{label}</span>
              </a>
            )}
          </nav>
          <div className="nav-meta">
            <span className="live-dot"></span>
            <span>{getCurrentSemester()}</span>
          </div>
        </div>
      </div>
    </header>);

}

function Footer() {
  return (
    <footer className="foot">
      <div className="container">
        <div className="foot-grid">
          <div className="foot-col">
            <h4>Ye's Research Group</h4>
            <div style={{ fontSize: 16, letterSpacing: '-0.01em', lineHeight: 1.4, maxWidth: '34ch' }}>
              Sustainable buildings from micro to macro scales at Colorado School of Mines.
            </div>
            <div style={{ marginTop: 24, display: 'grid', gap: 6 }}>
              <div className="label">VISIT</div>
              <div style={{ fontSize: 13, color: 'color-mix(in oklab, var(--paper) 80%, transparent)' }}>{LAB.location}</div>
              <img src="assets/mines-logo-white.png" alt="Colorado School of Mines"
                   style={{ marginTop: 16, width: '34ch', maxWidth: '100%', display: 'block', opacity: 0.85 }} />
            </div>
          </div>
          <div className="foot-col">
            <h4>Pages</h4>
            <a href="#home">Home</a>
            <a href="#research">Research</a>
            <a href="#members">Members</a>
            <a href="#publications">Publications</a>
            <a href="#news">News</a>
            <a href="#awards">Awards</a>
            <a href="#gallery">Gallery</a>
          </div>
          <div className="foot-col">
            <h4>Contact</h4>
            <a href={`mailto:${LAB.email}`}>{LAB.email}</a>
            <a href="https://www.mines.edu/">Colorado School of Mines</a>
            <a href="https://cee.mines.edu/">Department of CEE</a>
            <a href="https://cee.mines.edu/project/yunyang-ye/">Dr. Yunyang Ye</a>
          </div>
          <div className="foot-col">
            <h4>Elsewhere</h4>
            <a href="https://scholar.google.com/citations?user=B9WSzWcAAAAJ&hl=en&oi=ao">Google Scholar</a>
            <a href="https://www.researchgate.net/profile/Yunyang-Ye-3">ResearchGate</a>
            <a href="https://github.com/Ye-s-Lab-Team">GitHub / Ye's Lab Team</a>
            <a href="https://www.linkedin.com/in/yunyang-ye-90b137125/">LinkedIn</a>
          </div>
        </div>
        <div className="foot-bot">
          <div>© Ye's Research Group · {LAB.department}, {LAB.university}</div>
          <div>Est. {LAB.established} · Last build {getBuildDate()}</div>
        </div>
      </div>
    </footer>);

}

function PageHead({ idx, title, lede, meta }) {
  return (
    <div className="page-head">
      <div className="container">
        <div className="page-head-top">
          <span className="label">{idx} / {title.toUpperCase()}</span>
          <span className="label">{new Date().getFullYear()}</span>
        </div>
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
        {meta &&
        <div className="page-head-meta">
            {meta.map((m, i) =>
          <div key={i}>
                <div className="label">{m[0]}</div>
                <div style={{ fontSize: 15, marginTop: 4 }}>{m[1]}</div>
              </div>
          )}
          </div>
        }
      </div>
    </div>);

}

function Ticker() {
  const items = [
  "NOW HIRING · 2 PhD positions · Fall 2026",
  "NEW · Nature Energy paper, Rao et al.",
  "TALK · IBPSA-USA keynote, May 14",
  "DATA · 12-building trial released (CC-BY)",
  "OPEN CALL · Reading group, Weds 4pm",
  "GRANT · $2.4M DOE BTO award announced",
  "DEFENSE · Luna Kim, Spring 2026"];

  const line = items.concat(items);
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {line.map((t, i) => <span key={i}><span className="pip"></span>{t}</span>)}
      </div>
    </div>);

}

Object.assign(window, { Nav, Footer, PageHead, Ticker, useReveal });