// Set current date in Quick Stats
document.getElementById('current-date').textContent = new Date().toLocaleString();

// Theme switching
const themeButtons = document.querySelectorAll('.theme-btn');
themeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const theme = button.getAttribute('data-theme');
    document.documentElement.classList.remove('theme-light', 'theme-blue', 'theme-dark');
    document.documentElement.classList.add(`theme-${theme}`);
    localStorage.setItem('miniapp_theme', theme);

    // Update button styles
    themeButtons.forEach(btn => {
      btn.classList.remove('accent-bg', 'text-white', 'shadow');
      btn.classList.add('text-primary-80');
    });
    button.classList.add('accent-bg', 'text-white', 'shadow');
    button.classList.remove('text-primary-80');
  });
});

// Add DZ button functionality
document.getElementById('add-dz-btn').addEventListener('click', () => {
  const dzInput = document.getElementById('dz-input');
  const dzText = dzInput.value.trim();
  if (!dzText) {
    alert('Введите текст ДЗ');
    return;
  }
  alert(`ДЗ добавлено: ${dzText}`);
  dzInput.value = '';
});
