/* App root — routing + tweaks */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#3869d4",
  "typePair": "inter-jb",
  "density": "comfy",
  "memberView": "grid"
}/*EDITMODE-END*/;

const TYPE_PAIRS = {
  "inter-jb":     { sans: "'Poppins', ui-sans-serif, sans-serif", mono: "'Google Sans Code', ui-monospace, monospace", serif: "'EB Garamond', Garamond, serif", label: "Poppins + Google Sans Code" },
  "geist-ibm":    { sans: "'Poppins', ui-sans-serif, sans-serif", mono: "'Google Sans Code', ui-monospace, monospace", serif: "'EB Garamond', Garamond, serif", label: "Poppins + Google Sans Code (alt)" },
  "neue-fira":    { sans: "'Poppins', ui-sans-serif, sans-serif", mono: "'Google Sans Code', ui-monospace, monospace", serif: "'EB Garamond', Garamond, serif", label: "Poppins + Google Sans Code (mid)" },
  "serif-led":    { sans: "'Poppins', ui-sans-serif, sans-serif", mono: "'Google Sans Code', ui-monospace, monospace", serif: "'EB Garamond', Garamond, serif", label: "Poppins + Garamond (editorial)" },
};

function App() {
  const { values, setValue } = useTweaks(TWEAK_DEFAULTS);
  const parseHash = () => {
    const raw = (location.hash || '#home').slice(1).split('?')[0] || 'home';
    const [route, ...rest] = raw.split('/');
    return { route, param: rest.join('/') };
  };
  const [routing, setRouting] = React.useState(parseHash);
  const route = routing.route;

  React.useEffect(() => {
    const onHash = () => setRouting(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [routing.route, routing.param]);

  // Apply tweaks to DOM
  React.useEffect(() => {
    const pair = TYPE_PAIRS[values.typePair] || TYPE_PAIRS["inter-jb"];
    document.documentElement.style.setProperty('--font-sans', pair.sans);
    document.documentElement.style.setProperty('--font-mono', pair.mono);
    document.documentElement.style.setProperty('--font-serif', pair.serif);
    // Convert hex → oklch friendly for accent; just pass through as the accent var
    document.documentElement.style.setProperty('--accent', values.accent);
    document.documentElement.style.setProperty('--accent-soft', values.accent + '1a');
    document.body.className = 'density-' + values.density;
  }, [values.accent, values.typePair, values.density]);

  const nav = (id) => {
    location.hash = '#' + id;
  };

  const [heroVariant, setHeroVariant] = React.useState('a');

  return (
    <div className="page" data-screen-label={route}>
      <Nav current={route} onNav={nav} />
      <main>
        {route === 'home'         && <Home density={values.density} view={values.memberView} heroVariant={heroVariant} />}
        {route === 'research'     && !routing.param && <Research />}
        {route === 'research'     && routing.param  && <ResearchDetail code={routing.param} />}
        {route === 'members'      && <Members view={values.memberView} />}
        {route === 'member'       && <MemberDetail id={routing.param} />}
        {route === 'publications' && <Publications />}
        {route === 'news'         && <News />}
        {route === 'awards'       && <Awards />}
        {route === 'gallery'      && <Gallery />}
      </main>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Accent">
          <TweakColor label="Accent color" value={values.accent} onChange={(v) => setValue('accent', v)} />
          <div style={{display:'flex', gap:6, marginTop:8, flexWrap:'wrap'}}>
            {[
              ["Cobalt",   "#3869d4"],
              ["Kelp",     "#2f7a5f"],
              ["Rust",     "#b5542a"],
              ["Plum",     "#6b3e7c"],
              ["Graphite", "#2a2a2a"],
              ["Canary",   "#c9a227"],
            ].map(([n, c]) => (
              <button key={c} onClick={() => setValue('accent', c)} title={n}
                style={{
                  width:22, height:22, borderRadius:'50%', background:c,
                  border: '2px solid ' + (values.accent === c ? '#fff' : 'transparent'),
                  outline: '1px solid rgba(0,0,0,0.15)',
                  cursor:'pointer'
                }} />
            ))}
          </div>
        </TweakSection>

        <TweakSection title="Typography">
          <TweakSelect label="Type pair" value={values.typePair} onChange={(v) => setValue('typePair', v)}
            options={Object.entries(TYPE_PAIRS).map(([k, v]) => ({ value: k, label: v.label }))} />
        </TweakSection>

        <TweakSection title="Density">
          <TweakRadio label="Spacing" value={values.density} onChange={(v) => setValue('density', v)}
            options={[
              { value:'compact', label:'Compact' },
              { value:'comfy',   label:'Comfy' },
              { value:'roomy',   label:'Roomy' },
            ]} />
        </TweakSection>

        <TweakSection title="Members view">
          <TweakRadio label="Layout" value={values.memberView} onChange={(v) => setValue('memberView', v)}
            options={[
              { value:'grid', label:'Grid' },
              { value:'list', label:'List' },
            ]} />
          <div className="mono" style={{fontSize:10.5, color:'#888', marginTop:6}}>Applies on the Members page.</div>
        </TweakSection>

        {route === 'home' && (
          <TweakSection title="Hero variant (home)">
            <TweakRadio label="Style" value={heroVariant} onChange={setHeroVariant}
              options={[
                { value:'a', label:'A · Grotesque manifesto' },
                { value:'b', label:'B · Editorial italic' },
                { value:'c', label:'C · Split + feature' },
              ]} />
          </TweakSection>
        )}
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
