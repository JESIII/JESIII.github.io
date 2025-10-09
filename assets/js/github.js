/* assets/js/github.js
   Fetch public GitHub repos for a user and render a simple card grid.
*/

(async function () {
  const username = 'JESIII';
  const container = document.getElementById('github-repos');
//   const status = document.getElementById('github-status');
//   const refreshBtn = document.getElementById('github-refresh');

  if (!container) return; // page may not include the section

  async function fetchRepos() {
    // status.textContent = 'Loading...';
    try {
      const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=20&sort=updated`);
      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
      const repos = await res.json();
      renderRepos(repos);
    //   status.textContent = `Loaded ${repos.length} repos`;
    } catch (err) {
      console.error(err);
    //   status.textContent = 'Failed to load repos';
      container.innerHTML = `<div class="text-monospace" style="color:#f88">Error loading GitHub repositories.</div>`;
    }
  }

  function renderRepos(repos) {
    if (!Array.isArray(repos) || repos.length === 0) {
      container.innerHTML = '<div class="text-monospace" style="color:rgb(160,160,160);">No public repositories found.</div>';
      return;
    }

    const cards = repos.map(repo => {
      const lang = repo.language ? `<span class="repo-lang">${repo.language}</span>` : '';
      const stars = repo.stargazers_count ? `<span class="repo-stars">★ ${repo.stargazers_count}</span>` : '';
      const desc = repo.description ? repo.description : '';
      const homepage = repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="repo-homepage">website</a>` : '';

      return `
        <div class="repo-card card bg-dark text-light border-1 mb-2">
          <div class="card-body">
            <h5 class="card-title text-monospace"><a href="${repo.html_url}" target="_blank">${repo.name}</a></h5>
            <p class="card-text text-monospace repo-desc">${escapeHtml(desc)}</p>
            <div class="repo-meta text-monospace">${lang} ${stars} ${homepage}</div>
          </div>
        </div>
      `;
    }).join('\n');

    container.innerHTML = `<div class="repo-list">${cards}</div>`;
  }

  function escapeHtml(str){
    if(!str) return '';
    return str.replace(/[&<>\"]+/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];
    });
  }

//   refreshBtn.addEventListener('click', fetchRepos);
  // auto-load once
  fetchRepos();
})();
