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
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); //0 index = january

    const firstDay = new Date(year, month, 1).getDay(); 
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarBody = document.getElementById("calendar-body");
    calendarBody.innerHTML = ""; // clear previous calendar

    let day = 1;
    for (let week = 0; week < 6; week++) {
      const row = document.createElement("tr");
      for (let d = 0; d < 7; d++) {
        const cell = document.createElement("td");
        if(week === 0 && d < firstDay) {
          cell.textContent = "";
        } else if (day > daysInMonth) {
          cell.textContent = "";
        } else {
          cell.textContent = day;
          // here we add jalali/hijri conversion and special day info
          day++;
        }
        row.appendChild(cell);
      }
      calendarBody.appendChild(row);
    }
  }

  renderCalendar();
});
