const listElement = document.querySelector('#starred-list');

async function loadStarredRepos() {
  try {
    const response = await fetch('events.json');

    if (!response.ok) {
      throw new Error('Unable to load starred repositories.');
    }

    const repositories = await response.json();
    renderStarredRepos(repositories);
  } catch (error) {
    listElement.innerHTML = `<li class="error-message">${error.message}</li>`;
  }
}

function renderStarredRepos(repositories) {
  if (!repositories.length) {
    listElement.innerHTML = '<li class="empty-message">No starred repositories yet.</li>';
    return;
  }

  listElement.innerHTML = repositories
    .map(
      (repo) => `
        <li class="repo-item">
          <div class="repo-header">
            <h2><a href="${repo.url}" target="_blank" rel="noreferrer">${repo.name}</a></h2>
            <span class="star-count">★ ${repo.stargazers_count}</span>
          </div>
          <p class="description">${repo.description || 'No description provided.'}</p>
          <div class="meta">
            <span>${repo.language || 'Unknown language'}</span>
            <span>Updated ${new Date(repo.updated_at).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}</span>
          </div>
        </li>
      `,
    )
    .join('');
}

loadStarredRepos();
