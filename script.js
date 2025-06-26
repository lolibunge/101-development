
const progressBar = document.getElementById('progress-bar');
const slides = document.querySelectorAll('.slide');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / totalHeight) * 100;
  progressBar.style.width = scrollPercent + '%';
});

const sections = document.querySelectorAll('.slide');
const navLinks = document.querySelectorAll('.slide-nav .nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const navLink = document.querySelector(`.slide-nav a[href="#${id}"]`);

    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
}, {
  root: null,
  rootMargin: '0px',
  threshold: 0.3
});

sections.forEach(section => observer.observe(section));
// HTML (slide 6)
document.getElementById('runCode')?.addEventListener('click', function () {
  const input = document.getElementById('htmlInput').value;
  const iframe = document.getElementById('preview');
  iframe.srcdoc = input;
});

// CSS (slide 7)
document.getElementById('runCssCode')?.addEventListener('click', function () {
  const input = document.getElementById('cssInput').value;
  const iframe = document.getElementById('cssPreview');
  iframe.srcdoc = input;
});


// CSS (slide 8)
// Show modal globally
function showGreeting(name) {
  const greetingMessage = document.getElementById('greetingMessage');
  const modal = document.getElementById('modal');

  greetingMessage.textContent = name ? `¡Hola ${name}!` : '¡Escribí tu nombre primero!';
  modal.classList.remove('hidden');
}

// Hide modal globally
function hideModal() {
  document.getElementById('modal').classList.add('hidden');
}

// Modal close listeners
document.getElementById('closeModal')?.addEventListener('click', hideModal);
document.getElementById('modal')?.addEventListener('click', (e) => {
  if (e.target.id === 'modal') hideModal();
});

// Handle JS injection
document.getElementById('runJsCode')?.addEventListener('click', () => {
  const code = document.getElementById('jsInput').value;

  const styles = `
    <style>
      body {
        font-family: 'Montserrat', sans-serif;
        padding: 1rem;
      }
      input {
        padding: 0.5rem;
        font-size: 1rem;
        margin-right: 0.5rem;
      }
      button {
        padding: 0.5rem 1rem;
        font-size: 1rem;
        background-color: #ed174c;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      button:hover {
        background-color: #c3143e;
      }
    </style>
  `;

  document.getElementById('jsPreview').srcdoc = `
    <!DOCTYPE html>
    <html>
      <head>${styles}</head>
      <body>
        <input id="nameInput" type="text" />
        <button id="sayHello">Saludar</button>
        <script>
          window.onload = () => {
            document.getElementById('sayHello').addEventListener('click', () => {
              const name = document.getElementById('nameInput').value;
              parent.showGreeting(name);
            });
          };
        </script>
      </body>
    </html>
  `;
});


document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);

    const headerOffset = document.querySelector('header').offsetHeight;
    const elementPosition = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});
