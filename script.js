// Smooth scroll to top on nav link click
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Tooltip behavior for any element with data-tooltip
const tooltips = document.querySelectorAll('[data-tooltip]');
tooltips.forEach(el => {
  el.addEventListener('mouseenter', () => {
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = el.getAttribute('data-tooltip');
    document.body.appendChild(tooltip);

    const rect = el.getBoundingClientRect();
    tooltip.style.position = 'absolute';
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.top = `${rect.top + window.scrollY - 30}px`;
    tooltip.style.background = '#333';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '4px 8px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '0.875rem';
    tooltip.style.zIndex = 1000;

    el._tooltip = tooltip;
  });

  el.addEventListener('mouseleave', () => {
    if (el._tooltip) {
      el._tooltip.remove();
      el._tooltip = null;
    }
  });
});
