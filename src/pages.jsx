/* Members, Research, Publications, News, Awards, Gallery pages */

function Portrait({ member, forceColor = false }) {
  if (member.photo) {
    return (
      <div className={"portrait-bw is-photo" + (forceColor ? " is-color" : "")}
           style={{ backgroundImage: `url("${member.photo}")` }}>
      </div>
    );
  }
  return <div className={"portrait-bw" + (forceColor ? " is-color" : "")} data-initial={member.initial}></div>;
}

function MemberGroup({ members, open }) {
  return (
    <div className="member-grid">
      {members.map((m) => (
        <a key={m.id} href={'#member/' + m.id}
           onClick={(e) => { e.preventDefault(); open(m.id); }}
           className="member-tile reveal">
          <div className="member-portrait">
            <Portrait member={m} />
          </div>
          <div className="member-meta">
            <h3>{m.name}</h3>
            <div className="member-position">{m.role}</div>
            <div className="member-joined">Joined {m.joined}</div>
          </div>
        </a>
      ))}
    </div>
  );
}

function Members({ view = 'grid' }) {
  useReveal();
  const pi = MEMBERS.find(m => m.role.includes('Principal'));
  const postdocs = MEMBERS.filter(m => m.role.toLowerCase().includes('postdoc'));
  const phds = MEMBERS.filter(m => m.role.toLowerCase().includes('phd'));

  const open = (id) => { location.hash = '#member/' + id; };

  return (
    <>
      <PageHead
        idx="02"
        title="Members"
        meta={[["POSTDOCS", postdocs.length], ["PHDS", phds.length], ["ALUMNI", ALUMNI.length], ["OPEN", "TBD"]]}
      />

      {/* PI feature */}
      {pi && (
        <section className="block tight">
          <div className="container">
            <h2 className="reveal" style={{fontSize:24, fontWeight:500, letterSpacing:'-0.02em', margin:'0 0 16px'}}>Principal Investigator</h2>
            <a href={'#member/' + pi.id}
               onClick={(e) => { e.preventDefault(); open(pi.id); }}
               className="pi-feature reveal">
              <div className="pi-portrait">
                <Portrait member={pi} />
              </div>
              <div className="pi-info">
                <div className="label">{pi.role}</div>
                <h3>{pi.name}</h3>
                <div className="pi-meta">
                  <span>{pi.title}</span>
                  <span className="dot">·</span>
                  <span>Joined {pi.joined}</span>
                </div>
                <div className="pi-arrow">View profile <span>→</span></div>
              </div>
            </a>
          </div>
        </section>
      )}

      {/* Postdoctoral Researchers */}
      {postdocs.length > 0 && (
        <section className="block tight">
          <div className="container">
            <h2 className="reveal" style={{fontSize:24, fontWeight:500, letterSpacing:'-0.02em', margin:'0 0 16px'}}>Postdoctoral Researchers</h2>
            <MemberGroup members={postdocs} open={open} />
          </div>
        </section>
      )}

      {/* PhD Students */}
      {phds.length > 0 && (
        <section className="block tight">
          <div className="container">
            <h2 className="reveal" style={{fontSize:24, fontWeight:500, letterSpacing:'-0.02em', margin:'0 0 16px'}}>PhD Students</h2>
            <MemberGroup members={phds} open={open} />
          </div>
        </section>
      )}

      {/* Alumni */}
      <section className="block tight">
        <div className="container">
          <h2 className="reveal" style={{fontSize:24, fontWeight:500, letterSpacing:'-0.02em', margin:'0 0 16px'}}>Alumni</h2>
          <div>
            {ALUMNI.map((a, i) => (
              <div key={i} className="reveal alumni-row">
                <div className="mono">{a.year}</div>
                <div className="alumni-name">{a.name}</div>
                <div className="alumni-role">{a.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function MemberDetail({ id }) {
  useReveal();
  const m = MEMBERS.find(x => x.id === id);
  if (!m) {
    return (
      <section className="block">
        <div className="container">
          <PageHead idx="02" title="Not found" lede="No member with that id." />
          <a href="#members" style={{display:'inline-block', marginTop:32, fontSize:14}}>← Back to members</a>
        </div>
      </section>
    );
  }
  // related publications by surname match
  // const surname = m.name.split(' ').slice(-1)[0];
  // const related = PUBLICATIONS.filter(p => p.authors.some(a => a.startsWith(surname.charAt(0)) && a.toLowerCase().includes(surname.toLowerCase().slice(0,4))));
  const related = PUBLICATIONS.filter(p => p.members?.includes(m.id));
  
  return (
    <>
      <section className="block" style={{paddingTop: 64}}>
        <div className="container">
          <a href="#members" className="label" style={{display:'inline-flex', alignItems:'center', gap:8, marginBottom:32}}>
            <span>←</span> BACK TO MEMBERS
          </a>
          <div className="member-detail">
            <div className="member-detail-portrait">
              <Portrait member={m} forceColor />
            </div>
            <div className="member-detail-info">
              <div className="label">{m.role}</div>
              <h1 className="member-detail-name">{m.name}</h1>
              <div className="member-detail-sub">{m.title} · {m.pronouns}</div>

              {m.employment && m.employment.length > 0 && ( 
                <div className="member-detail-section"> 
                  <div className="label">EMPLOYMENT</div>
                  <ul className="member-detail-edu"> 
                    {m.employment.map((e, i) => <li key={i}>{e}</li>)} 
                  </ul> 
                </div> 
              )}

              {m.education && m.education.length > 0 && ( 
                <div className="member-detail-section"> 
                  <div className="label">EDUCATION</div>
                  <ul className="member-detail-edu"> 
                    {m.education.map((e, i) => <li key={i}>{e}</li>)} 
                  </ul> 
                </div> 
              )}

              {m.interests && m.interests.length > 0 && (
                <div className="member-detail-section">
                  <div className="label">RESEARCH INTERESTS</div>
                  <ul className="member-detail-edu">
                    {m.interests.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="member-detail-section">
                <div className="label">OFFICE</div>
                <div className="member-detail-value">{m.office}</div>
              </div>

              <div className="member-detail-section">
                <div className="label">EMAIL</div>
                <div className="member-detail-value">
                  <a href={'mailto:' + m.email} style={{color:'var(--accent)'}}>{m.email}</a>
                </div>
              </div>

              {(m.profiles?.length > 0 || 'cv' in m) && (
                <div className="member-profile-links">
                  {m.profiles && m.profiles.map((p, i) => (
                    <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                       className="profile-btn">
                      <i className={'ai ' + (p.label === 'Google Scholar' ? 'ai-google-scholar' : 'ai-researchgate') + ' profile-btn-icon'}></i>
                      {p.label}
                      <span className="profile-btn-arrow">↗</span>
                    </a>
                  ))}
                  {'cv' in m && (
                    m.cv
                      ? <a href={m.cv} target="_blank" rel="noopener noreferrer" className="profile-btn">
                          <span className="profile-btn-icon" style={{fontFamily:'var(--font-mono)', fontSize:12}}></span>
                          Curriculum Vitae
                          <span className="profile-btn-arrow">↗</span>
                        </a>
                      : <span className="profile-btn profile-btn--disabled">
                          <span className="profile-btn-icon" style={{fontFamily:'var(--font-mono)', fontSize:12}}></span>
                          Curriculum Vitae
                        </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {((m.professionalActivities && m.professionalActivities.length > 0) ||
        (m.awards && m.awards.length > 0)) && (
        <section className="block" style={{background:'var(--paper-2)'}}>
          <div className="container">

            {m.professionalActivities && m.professionalActivities.length > 0 && (
              <>
                <div className="section-head" style={{marginBottom: 24}}>
                  <h2 className="reveal">Major Professional Activities</h2>
                </div>
                <ul className="bullet-list reveal">
                  {m.professionalActivities.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </>
            )}

            {m.awards && m.awards.length > 0 && (
              <>
                <div className="section-head" style={{marginTop: 64, marginBottom: 24}}>
                  <h2 className="reveal">Major Awards</h2>
                </div>
                <ul className="bullet-list reveal">
                  {m.awards.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="block" style={{background:'var(--paper-2)'}}>
          <div className="container">
            <div className="section-head" style={{marginBottom: 24}}>
              <h2 className="reveal">Recent work</h2>
            </div>
            <div>
              {related.map((p, i) => (
                <a key={i} href="#publications" className={"pub-row reveal" + (p.featured ? ' featured' : '')}>
                  <span className="ptype">{p.type}</span>
                  <div>
                    <div className="ptitle">{p.title}</div>
                    <div className="pauthors">{p.authors.join(', ')}</div>
                  </div>
                  <div className="right">
                    <div className="pvenue">{p.venue}</div>
                    <div className="pdoi">{p.doi}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function ResearchDetail({ code }) {
  useReveal();
  const r = RESEARCH_AREAS.find(x => x.code === code);
  if (!r) {
    return (
      <section className="block">
        <div className="container">
          <a href="#research" className="label" style={{display:'inline-flex', alignItems:'center', gap:8, marginBottom:32}}>
            <span>←</span> BACK TO RESEARCH
          </a>
          <p>Project not found.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="block" style={{paddingTop:64}}>
        <div className="container">
          <a href="#research" className="label"
             onClick={(e) => { e.preventDefault(); location.hash = '#research'; }}
             style={{display:'inline-flex', alignItems:'center', gap:8, marginBottom:40, cursor:'pointer'}}>
            <span>←</span> BACK TO RESEARCH
          </a>

          <div className="research-detail-grid">
            {/* Left: project image */}
            <div className="research-detail-img reveal">
              <img
                src={r.image}
                alt={r.title}
                className="research-img-photo"
              />
            </div>

            {/* Right: info */}
            <div className="research-detail-info">
              <div className="label reveal">{r.code} / Project</div>
              <h1 className="research-detail-title reveal">{r.title}</h1>

              {r.tags && r.tags.length > 0 && (
                <div className="tag-row reveal" style={{marginTop:16}}>
                  {r.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              )}

              <p className="research-detail-summary reveal">{r.extended || r.summary}</p>

              {r.extendedBullets && r.extendedBullets.length > 0 && (
                <ol className="research-detail-bullets reveal">
                  {r.extendedBullets.map((b, i) => (
                    <li key={i}><span className="research-bullet-num">({i+1})</span>{b}</li>
                  ))}
                </ol>
              )}

              {r.link && (
                <p className="research-detail-summary reveal" style={{marginTop:16}}>
                  <a href={r.link.url} target="_blank" rel="noopener noreferrer"
                     style={{color:'var(--accent)', textDecoration:'underline', textUnderlineOffset:'3px'}}>
                    {r.link.label} →
                  </a>
                </p>
              )}

              <div className="research-detail-meta">
                <div className="reveal">
                  <div className="label">SPONSOR</div>
                  <ul className="research-meta-list">
                    {r.sponsor_extended.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>

                {r.collaborator && r.collaborator.length > 0 && r.collaborator[0] !== '-' && (
                  <div className="reveal">
                    <div className="label">COLLABORATORS</div>
                    <ul className="research-meta-list">
                      {r.collaborator.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Research() {
  useReveal();
  return (
    <>
      <PageHead
        idx="01"
        title="Research"
      />
      <section className="block">
        <div className="container">
          <ResearchList />
        </div>
      </section>

      <section className="block">
        <div className="container">
          <div className="section-head">
            <h2 className="reveal">Current Collaborators</h2>
          </div>
          <div style={{
            display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gap:1,
            background:'var(--rule)', border:'1px solid var(--rule)'
          }}>
            {["PNNL", "ORNL", "NLR", "LBNL", "Penn State", "Georgia Tech"].map((p, i) => (
              <div key={i} className="reveal" style={{
                background:'var(--paper)', padding:'32px 20px', textAlign:'center',
                fontSize:15, letterSpacing:'-0.01em'
              }}>{p}</div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Publications() {
  useReveal();
  // Sort: newest first, original order within year preserved
  const sorted = [...PUBLICATIONS].sort((a, b) => b.year - a.year);

  return (
    <>
      <PageHead
        idx="03"
        title="Publications"
        lede="Peer-reviewed papers, conference proceedings, and the occasional book chapter. DOIs where available; preprints on request."
      />

      <section className="block tight">
        <div className="container">
          <div className="pub-table" role="table">
            <div className="pub-table-head" role="row">
              <div className="pcol-title">Publications</div>
              <div className="pcol-year">Year</div>
              <div className="pcol-type">Type</div>
              <div className="pcol-link">Link</div>
            </div>
            {sorted.map((p, i) => (
              <div key={i} className="pub-table-row reveal" role="row">
                <div className="pcol-title">
                  <div className="ptitle">{p.title}</div>
                  <div className="pauthors">{renderAuthors(p.authors)}</div>
                  <div className="pvenue">{p.venue}</div>
                </div>
                <div className="pcol-year">{p.year}</div>
                <div className="pcol-type">{p.type}</div>
                <div className="pcol-link">
                  {p.doi && p.doi !== '—' ? (
                    <a href={'https://doi.org/' + p.doi} target="_blank" rel="noopener" className="pdoi-link">DOI</a>
                  ) : (
                    <span className="pdoi-empty">—</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* Bold the lab's own author name in author lists. Match "Ye, Y." surname-initial form. */
const LAB_AUTHORS = ["Y. Ye", "Y. Kim", "R. Kim", "H. Yu", "W. Huang", "N. Faghih"];

function renderAuthors(authors) {
  return authors.map((a, i) => {
    const isLab = LAB_AUTHORS.some(name => a.startsWith(name));
    return (
      <React.Fragment key={i}>
        {i > 0 && <span>, </span>}
        {isLab ? <strong>{a}</strong> : <span>{a}</span>}
      </React.Fragment>
    );
  });
}

function News() {
  useReveal();
  return (
    <>
      <PageHead
        idx="04"
        title="News"
        lede="Papers, grants, talks, welcomes, and the occasional defense."
      />
      <section className="block tight">
        <div className="container">
          <div className="news-list">
            {NEWS.map((n, i) => (
              <div key={i} className="news-item reveal">
                <div className="ndate">{n.date}</div>
                <div className="nkind">{n.kind}</div>
                <div>
                  <h3>{n.title}</h3>
                  <div className="nbody">{n.body}</div>
                </div>
                <div className="right">
                  {n.link && n.link !== '#'
                    ? <a href={n.link} target="_blank" rel="noopener noreferrer"
                         className="label" style={{color:'var(--accent)', textDecoration:'none', whiteSpace:'nowrap'}}>READ →</a>
                    : <span className="label" style={{color:'var(--ink-3)', whiteSpace:'nowrap'}}>—</span>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Awards() {
  useReveal();
  return (
    <>
      <PageHead
        idx="05"
        title="Awards"
        lede="Recognition for our people and for the lab as a whole."
      />
      <section className="block tight">
        <div className="container">
          {AWARDS.map((a, i) => (
            <div key={i} className="award-row reveal">
              <div className="ayear">{a.year}</div>
              <div className="awho">{a.who}</div>
              <div className="awhat">{a.what}</div>
              <div className="awhere">{a.where}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Gallery({ view = 'grid' }) {
  useReveal();
  const [tag, setTag] = React.useState('All');
  const tags = ['All', 'People', 'Outreach', 'Award'];
  const filtered = GALLERY.filter(g => tag === 'All' || g.tag === tag);

  // Group into rows by tag so same-event photos sit on one justified row
  const rows = tag !== 'All'
    ? [{ key: tag, items: filtered }]
    : (() => {
        const groups = {};
        filtered.forEach(g => {
          if (!groups[g.tag]) groups[g.tag] = [];
          groups[g.tag].push(g);
        });
        return Object.entries(groups).map(([key, items]) => ({ key, items }));
      })();

  return (
    <>
      <PageHead
        idx="06"
        title="Gallery"

      />
      <section className="block tight">
        <div className="container">
          <div style={{display:'flex', gap:6, marginBottom:24}}>
            {tags.map(t => (
              <button key={t}
                onClick={() => setTag(t)}
                style={{
                  fontFamily:'var(--font-mono)', fontSize:11, textTransform:'uppercase', letterSpacing:'0.06em',
                  padding:'8px 14px', borderRadius:100, cursor:'pointer',
                  background: tag === t ? 'var(--ink)' : 'transparent',
                  color: tag === t ? 'var(--paper)' : 'var(--ink-2)',
                  border: '1px solid ' + (tag === t ? 'var(--ink)' : 'var(--rule)'),
                }}>{t}</button>
            ))}
          </div>

          <div className="gallery-rows">
            {rows.map(({ key, items }) => {
              const isSinglePortrait = items.length === 1 && items[0].portrait;
              return (
                <div key={key} className={'g-row reveal' + (isSinglePortrait ? ' g-row--portrait' : '')}>
                  {items.map(g => (
                    <div key={g.id} className={'g-item' + (g.portrait ? ' g-item--portrait' : '')}>
                      <img src={g.photo} alt={g.label} className="g-photo" />
                      <div className="g-label">{g.label}</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { Members, MemberDetail, Research, ResearchDetail, Publications, News, Awards, Gallery });
