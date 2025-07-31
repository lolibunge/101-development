// router.js

const routes = {
  '/': 'home.html',
  '/home.html': 'home.html',
  '/stack.html': 'stack.html',
  '/languages.html': 'languages.html',
  '/tools.html': 'tools.html',
  '/good-dev.html': 'good-dev.html',
  '/infrastructure.html': 'infrastructure.html',
  '/getting-started.html': 'getting-started.html',
};

function loadPage(path) {
  const route = routes[path];
  const file = route || routes['/'];

  fetch(file)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
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

// Intercept link clicks
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');

  if (link && link.getAttribute('href') && link.host === location.host) {
    e.preventDefault();
    const path = new URL(link.href).pathname;
    history.pushState({}, '', path);
    loadPage(path);
  }
});

// Load correct page on browser nav
window.addEventListener('popstate', () => {
  loadPage(location.pathname);
});

// Initial load
loadPage(location.pathname);


function setActiveLink(path) {
  const normalizedPath = path === '/' || path === '/index.html' ? '/home.html' : path;

  document.querySelectorAll('nav a').forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath === normalizedPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

