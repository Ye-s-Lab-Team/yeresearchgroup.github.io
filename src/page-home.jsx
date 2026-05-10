/* Home page — manifesto hero + ticker + research preview + latest news + stats */

function Home({ density, view, heroVariant }) {
  useReveal();
  const variant = heroVariant || 'a';
  return (
    <>
      {variant === 'a' && <HeroA />}
      {variant === 'b' && <HeroB />}
      {variant === 'c' && <HeroC />}

      <section className="block">
        <div className="container">
          <div className="section-head">
            <span className="label">01 / Research</span>
            <a href="#research" className="label" style={{ color: 'var(--accent)' }}>ALL AREAS →</a>
          </div>
          <ResearchList limit={3} />
        </div>
      </section>

      <section className="block tight" style={{ background: 'var(--paper-2)' }}>
        <div className="container">
          <div className="section-head" style={{ marginBottom: 24 }}>
            <span className="label">02 / Latest News</span>
            <a href="#news" className="label" style={{ color: 'var(--accent)' }}>ALL NEWS →</a>
          </div>
          <div className="news-list" style={{ borderTop: '1px solid var(--rule)' }}>
            {NEWS.slice(0, 4).map((n, i) =>
            <div key={i} className="news-item reveal">
                <div className="ndate">{n.date}</div>
                <div className="nkind">{n.kind}</div>
                <div>
                  <h3>{n.title}</h3>
                  <div className="nbody">{n.body}</div>
                </div>
                <div className="right label">READ →</div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>);

}

function HeroA() {
  return (
    <section className="hero hero-bg">
      {/* Background image + #20314d monochrome overlay */}
      <div className="hero-bg-img" aria-hidden="true"></div>
      <div className="hero-bg-overlay" aria-hidden="true"></div>

      <div className="container" style={{position:'relative', zIndex:1}}>
        <div className="hero-title-wrap reveal">
          <div className="hero-title-line">
            <span className="hero-rule" style={{background:'linear-gradient(to left, rgba(245,247,250,0.3), transparent 90%)'}} aria-hidden="true"></span>
            <span className="hero-title" style={{color:'#f5f7fa'}}>Ye's Research Group</span>
            <span className="hero-rule" style={{background:'linear-gradient(to right, rgba(245,247,250,0.3), transparent 90%)'}} aria-hidden="true"></span>
          </div>
        </div>
        <h1 className="manifesto reveal" style={{color:'#f5f7fa'}}>
          SUSTAINABLE BUILDINGS FROM MICRO TO MACRO SCALES
        </h1>
        <p className="hero-mission reveal" style={{color:'#f5f7fa'}}>
          Our mission is to become a research and education center for sustainable buildings from micro (building energy systems) to macro (urban scale). The group works on integrated solutions for sustainable, resilient, and equitable buildings, communities, and cities in the design and operation stages. With close collaborations with different domain experts and industrial partners, the group hopes to bridge architectural engineering and other domains' knowledge, and research and practical applications for interdisciplinary research.
        </p>
      </div>
    </section>);

}

function ResearchList({ limit }) {
  const list = limit ? RESEARCH_AREAS.slice(0, limit) : RESEARCH_AREAS;
  const open = (code) => { location.hash = '#research/' + code; };

  return (
    <div className="research-list">
      {list.map((r) => (
        <a key={r.code} href={'#research/' + r.code}
           onClick={(e) => { e.preventDefault(); open(r.code); }}
           className="research-row reveal">
          <span className="mono muted" style={{alignSelf:'start'}}>{r.code}</span>

          <div style={{alignSelf:'start'}}>
            <div className="label" style={{marginBottom:6}}>SPONSOR</div>
            <div style={{fontSize:14, color:'var(--ink-2)', lineHeight:1.5}}>{r.sponsor.join(", ")}</div>
          </div>

          <div style={{alignSelf:'start'}}>
            <h3>{r.title}</h3>
            <div className="rsum" style={{ marginTop: 8 }}>{r.summary}</div>
            {r.tags && (
              <div className="tag-row" style={{marginTop:12}}>
                {r.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            )}
          </div>

          <div style={{alignSelf:'start'}}>
            {r.collaborator && r.collaborator.length > 0 && r.collaborator[0] !== '-' && (
              <>
                <div className="label" style={{marginBottom:6}}>COLLABORATORS</div>
                <div style={{display:'flex', flexDirection:'column', gap:4}}>
                  {r.collaborator.map((t) => (
                    <span key={t} style={{fontSize:14, color:'var(--ink-2)'}}>{t}</span>
                  ))}
                </div>
              </>
            )}
          </div>

          <span className="arrow" style={{alignSelf:'start'}}>→</span>
        </a>
      ))}
    </div>
  );
}

Object.assign(window, { Home, ResearchList });