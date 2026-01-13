// Get the base path from the current location (useful for GitHub Pages)
const basePath = window.location.pathname.includes('/')
  ? window.location.pathname.split('/').slice(0, -1).join('/')
  : '';

const routes = {
  '/': 'home.html',
  '/index.html': 'home.html',
  '/home.html': 'home.html',
  '/stack.html': 'stack.html',
  '/languages.html': 'languages.html',
  '/tools.html': 'tools.html',
  '/good-dev.html': 'good-dev.html',
  '/infrastructure.html': 'infrastructure.html',
  '/getting-started.html': 'getting-started.html'
};

function loadPage(path) {
  const file = routes[path] || routes['/'];
  const fetchPath = `${basePath}/${file}`;

  fetch(fetchPath)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return res.text();
    })
    .then(html => {
      document.getElementById('main-content').innerHTML = html;
      setActiveLink(path);
    })
    .catch(err => {
      console.error('Error loading page:', err);
      document.getElementById('main-content').innerHTML = '<h2>Error loading page</h2>';
    });
}

function setActiveLink(path) {
  const normalized = path === '/' || path === '/index.html' ? '/home.html' : path;

  document.querySelectorAll('nav a').forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath.endsWith(normalized)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (link && link.getAttribute('href') && link.host === location.host) {
    e.preventDefault();
    const path = new URL(link.href).pathname.replace(basePath, '');
    history.pushState({}, '', basePath + path);
    loadPage(path);
  }
});

window.addEventListener('popstate', () => {
  const path = location.pathname.replace(basePath, '');
  loadPage(path);
});

// Initial load
const initialPath = location.pathname.replace(basePath, '') || '/';
loadPage(initialPath);
