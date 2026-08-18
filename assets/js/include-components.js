// assets/js/include-components.js
// Simple client-side HTML include loader. Replaces elements with data-include="/path/to/file" with fetched HTML.
(function(){
  async function includeAll(){
    const nodes = document.querySelectorAll('[data-include]');
    for(const node of nodes){
      const url = node.getAttribute('data-include');
      try{
        const res = await fetch(url, {cache: 'no-store'});
        if(!res.ok){ node.innerHTML = ''; continue; }
        const html = await res.text();
        node.innerHTML = html;
      }catch(e){ console.error('Include failed', url, e); }
    }
    // After includes loaded, mark active nav link
    scheduleMarkActive();
  }

  function normalizePath(p){
    // Strip trailing slash for comparison — GitHub Pages serves /index.html as /
    if(!p) return '/';
    p = p.replace(/\/$/, '');
    if(p === '') return '/';
    return p;
  }

  function markActiveNav(){
    const links = document.querySelectorAll('nav a.nav-link');
    if(links.length === 0) return; // no nav found yet (might be loading)
    const current = normalizePath(location.pathname || '/');
    links.forEach(a => {
      try{
        const href = normalizePath(a.getAttribute('href'));
        if(href === current || (href === '/index.html' && current === '/') )
          a.classList.add('active-page');
        else
          a.classList.remove('active-page');
      }catch(e){}
    });
  }

  // Debounce to avoid marking active state before includes load
  let markActiveTimeout;
  function scheduleMarkActive(){
    clearTimeout(markActiveTimeout);
    markActiveTimeout = setTimeout(markActiveNav, 50);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', includeAll);
  else includeAll();

  // Also run on DOMContentLoaded as a fallback in case includes haven't loaded yet
  document.addEventListener('DOMContentLoaded', scheduleMarkActive);
})();