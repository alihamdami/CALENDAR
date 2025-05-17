dayjs.extend(window.dayjs_plugin_advancedFormat);

let currentDate = new Date(); // Tracks the visible month

// Special date definitions
const specialGregorianDates = {
  "2025-01-01": "New Year's Day",
  "2025-12-25": "Christmas Day"
};

const specialJalaliDates = {
  "1404-01-01": "Nowruz",
  "1404-01-13": "Sizdah Bedar"
};

const specialHijriDates = {
  "1447-10-01": "Eid al-Fitr",
  "1447-12-10": "Eid al-Adha"
};

document.addEventListener("DOMContentLoaded", function () {
  const showGregorian = document.getElementById("showGregorian");
  const showJalali = document.getElementById("showJalali");
  const showHijri = document.getElementById("showHijri");

  const prevBtn = document.getElementById("prevMonth");
  const nextBtn = document.getElementById("nextMonth");

  // Load from localStorage
  [showGregorian, showJalali, showHijri].forEach(input => {
    const saved = localStorage.getItem(input.id);
    if (saved !== null) input.checked = saved === "true";
    input.addEventListener("change", () => {
      localStorage.setItem(input.id, input.checked);
      renderCalendar();
    });
  });

  prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  function renderCalendar() {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let html = `<h4>${dayjs(currentDate).format("MMMM YYYY")}</h4>`;
    html += `<div class="row row-cols-5 g-2">`;

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayjsDate = dayjs(date);
      const gregKey = dayjsDate.format("YYYY-MM-DD");
      const jalali = jalaali.toJalaali(date);
      const jalaliKey = `${jalali.jy}-${String(jalali.jm).padStart(2, '0')}-${String(jalali.jd).padStart(2, '0')}`;
      const hijriMoment = moment(date);
      const hijriDateStr = hijriMoment.format("iYYYY-iMM-iDD");
      const hijriMonthsEN = [
      "Muharram", "Safar", "Rabi' al-awwal", "Rabi' al-thani",
      "Jumada al-awwal", "Jumada al-thani", "Rajab", "Sha'ban",
      "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
      ];
      const hijriMonthIndex = parseInt(hijriMoment.format("iM")) - 1;
      const hijriDay = hijriMoment.format("iD");
      const hijriYear = hijriMoment.format("iYYYY");
      const hijriReadable = `${hijriDay} ${hijriMonthsEN[hijriMonthIndex]} ${hijriYear}`;


      let content = `<strong>${day}</strong><br>`;
      let special = "";

      if (showGregorian.checked) {
        content += `G: ${dayjsDate.format("MMM D")}`;
        if (specialGregorianDates[gregKey]) special += specialGregorianDates[gregKey];
      }

      if (showJalali.checked) {
        content += `<br>J: ${jalaliKey}`;
        if (specialJalaliDates[jalaliKey]) special += `${specialJalaliDates[jalaliKey]}`;
      }

      if (showHijri.checked) {
        content += `<br>H: ${hijriReadable}`;
        if (specialHijriDates[hijriDateStr]) special += `<br>${specialHijriDates[hijriDateStr]}`;
      }

      html += `
        <div class="col">
          <div class="border p-2 small text-center bg-light">
            ${content}
            ${special ? `<div class="text-danger small">${special}</div>` : ""}
          </div>
        </div>`;
    }

    html += "</div>";
    calendar.innerHTML = html;
  }

  renderCalendar();
});
