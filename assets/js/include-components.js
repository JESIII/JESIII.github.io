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
    markActiveNav();
  }

  function normalizePath(p){
    // Strip origin and trailing slash
    try{ const u = new URL(p, location.href); return u.pathname.replace(/\/$/, '') || '/'; }catch(e){ return p; }
  }

  function markActiveNav(){
    const links = document.querySelectorAll('nav a.nav-link');
    const current = normalizePath(location.pathname || '/');
    links.forEach(a => {
      try{
        const href = normalizePath(a.getAttribute('href'));
        if(href === current || (href === '/index.html' && current === '/') ){
          a.classList.add('active-page');
        } else {
          a.classList.remove('active-page');
        }
      }catch(e){}
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', includeAll);
  else includeAll();
})();
