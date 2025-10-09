/* assets/js/linkedin.js
   Simple LinkedIn JSON renderer for a static site.
   Notes: LinkedIn requires OAuth for live API access. This file provides a local import/paste mechanism.
*/

(function(){
  const renderTarget = document.getElementById('linkedin-render');
//   const refreshBtn = document.getElementById('linkedin-refresh');
//   const status = document.getElementById('linkedin-status');

  if(!renderTarget) return;

  function tryParseJSON(input){
    try{ return JSON.parse(input); }catch(e){ return null; }
  }

  async function fetchAndRender(){
    // status.textContent = 'Loading...';
    try{
      const res = await fetch('/assets/data/linkedin.json', {cache: 'no-store'});
    //   if(!res.ok) throw new Error('Fetch failed: '+res.status);
      const text = await res.text();
      const data = tryParseJSON(text);
      if(!data){
        renderTarget.innerHTML = `<div class="text-monospace" style="color:#f88">Invalid JSON in assets/data/linkedin.json.</div>`;
        // status.textContent = 'Invalid JSON';
        return;
      }

    // LinkedIn exports vary. Try common keys.
    const sections = [];

    // Experience/Positions
    const positions = data.experience || data.positions || data.positionsView || data.elements || data.positions || null;
    // Education
    const education = data.education || data.educations || data.schools || null;
    // Certifications/Licenses
    const certs = data.certifications || data.licenses || data.licensesAndCertifications || null;
    // Projects
    const projects = data.projects || data.project || data.projectViews || null;

    if(positions){
      const items = Array.isArray(positions) ? positions : (positions.values || []);
      sections.push({title:'Experience', items: items.map(normalizePosition)});
    }

    if(education){
      const items = Array.isArray(education) ? education : (education.values || []);
      sections.push({title:'Education', items: items.map(normalizeEducation)});
    }

    if(certs){
      const items = Array.isArray(certs) ? certs : (certs.values || []);
      sections.push({title:'Licenses & Certifications', items: items.map(normalizeCertification)});
    }

    if(projects){
      const items = Array.isArray(projects) ? projects : (projects.values || []);
      sections.push({title:'Projects', items: items.map(normalizeProject)});
    }

      if(sections.length === 0){
        renderTarget.innerHTML = `<div class="text-monospace" style="color:rgb(160,160,160);">No recognizable LinkedIn sections found in assets/data/linkedin.json.</div>`;
        // status.textContent = 'No data';
        return;
      }

    const html = sections.map(s=>{
      const rows = s.items.map(it=>`<div class="li-item card bg-dark text-light border-1 mb-2"><div class="card-body text-monospace"><h5>${escapeHtml(it.title || it.role || it.name || '')}</h5><div class="muted">${escapeHtml(it.meta || '')}</div><p>${escapeHtml(it.desc || '')}</p></div></div>`).join('');
      return `<div class="li-section"><h4 class="text-monospace">${s.title}</h4>${rows}</div>`;
    }).join('\n');

      renderTarget.innerHTML = html;
    //   status.textContent = 'Loaded';
    }catch(err){
      console.error(err);
      renderTarget.innerHTML = `<div class="text-monospace" style="color:#f88">Failed to fetch assets/data/linkedin.json.</div>`;
    //   status.textContent = 'Failed';
    }
  }

  function normalizePosition(p){
    // Accept different shapes
    const title = p.title || p.role || p.position || p.organization || p.companyName || (p.company && p.company.name) || '';
    const company = p.company || p.companyName || p.employer || (p.organization && p.organization.name) || '';
    const start = (p.startDate && (p.startDate.year || p.startDate)) || p.from || '';
    const end = (p.endDate && (p.endDate.year || p.endDate)) || p.to || p.end || '';
    const desc = p.description || p.summary || p.note || '';
    const meta = [company, start && `from ${start}`, end && `to ${end}`].filter(Boolean).join(' · ');
    return {title: title, meta: meta, desc: desc};
  }

  function normalizeEducation(e){
    const school = e.schoolName || e.institution || e.institutionName || e.school || '';
    const degree = e.degree || e.degreeName || e.degreeName || '';
    const field = e.fieldOfStudy || e.field || '';
    const meta = [degree, field].filter(Boolean).join(' · ');
    const desc = e.description || '';
    return {title: school, meta: meta, desc: desc};
  }

  function normalizeCertification(c){
    const name = c.name || c.certificateName || c.title || '';
    const issuer = c.issuer || c.issuingOrganization || '';
    const meta = issuer;
    const desc = c.description || '';
    return {title: name, meta: meta, desc: desc};
  }

  function normalizeProject(p){
    const name = p.name || p.title || '';
    const desc = p.description || p.summary || '';
    const meta = p.url || p.link || '';
    return {title: name, meta: meta, desc: desc};
  }

  function escapeHtml(str){
    if(!str) return '';
    return String(str).replace(/[&<>\"]+/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];
    });
  }

  // event wiring
//   refreshBtn && refreshBtn.addEventListener('click', fetchAndRender);
  // auto-load once
  fetchAndRender();

})();
