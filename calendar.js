document.addEventListener("DOMContentLoaded", function () {
  // Dark mode toggle
  const darkModeToggle = document.getElementById("darkModeToggle");
  function setDarkMode(on) {
    document.body.classList.toggle("dark-mode", on);
    localStorage.setItem("darkMode", on ? "true" : "false");
    darkModeToggle.textContent = on ? "☀️" : "🌙";
  }
  // Load dark mode preference
  const darkPref = localStorage.getItem("darkMode") === "true";
  setDarkMode(darkPref);
  darkModeToggle.addEventListener("click", () => {
    setDarkMode(!document.body.classList.contains("dark-mode"));
  });

  function renderCalendar() {
    
  }

  renderCalendar();
});
