const calendarBody = document.getElementById("calendar-body");
const title = document.getElementById("calendar-title");
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");
const allTasksDropdown = document.getElementById("all-tasks-dropdown");


let tasks = JSON.parse(localStorage.getItem("tasks")) || {

  "2025-01-10": "TASK#A",
  "2025-01-15": "TASK#B"
};

let currentYear = 2025;
let currentMonth = 0; 

const monthNames = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
];

function renderCalendar(year, month) {
  calendarBody.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  title.textContent = `${monthNames[month]} ${year}`;

  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("td");

      if (i === 0 && j < firstDay) {
        cell.textContent = "";
      } else if (date > daysInMonth) {
        cell.textContent = "";
      } else {
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;

        cell.dataset.date = dateStr;
        cell.style.cursor = "pointer";

        if (tasks[dateStr]) {
          cell.classList.add("task");
          cell.innerHTML = `${date}<br><span class="task-label">${tasks[dateStr]}</span>`;
        } else {
          cell.textContent = date;
        }

        cell.addEventListener("click", () => {
          const existingNote = tasks[dateStr] || "";
          const note = prompt(`Add or edit note for ${dateStr}:`, existingNote);
          if (note === null) return;

          if (note.trim() === "") {
            delete tasks[dateStr];
          } else {
            tasks[dateStr] = note.trim();
          }

          localStorage.setItem("tasks", JSON.stringify(tasks));
          renderCalendar(currentYear, currentMonth);
          updateLatestTaskBox();
          populateTasksDropdown();
        });

        date++;
      }

      row.appendChild(cell);
    }

    calendarBody.appendChild(row);
    if (date > daysInMonth) break;
  }
}

function updateLatestTaskBox() {
  const today = new Date();
  const futureDates = Object.keys(tasks).filter(dateStr => new Date(dateStr) >= today);

  const box = document.getElementById("latest-task-box");

  if (futureDates.length === 0) {
    box.innerHTML = "No upcoming tasks.";
    return;
  }

  futureDates.sort((a, b) => new Date(a) - new Date(b));
  const nextDate = futureDates[0];
  const taskText = tasks[nextDate];

  const dateObj = new Date(nextDate);
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const displayDate = dateObj.toLocaleDateString("en-US", options).replace(",", "");

  box.innerHTML = `<span>${taskText}</span> DUE DATE: ${displayDate}`;
}

// Populate the dropdown with all tasks
function populateTasksDropdown() {
  // Clear all options except the placeholder
  allTasksDropdown.innerHTML = `<option value="">-- Select a Task --</option>`;

  const sortedTasks = Object.entries(tasks).sort((a, b) => new Date(a[0]) - new Date(b[0]));

  for (const [dateStr, note] of sortedTasks) {
    const option = document.createElement("option");
    const dateObj = new Date(dateStr);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const displayDate = dateObj.toLocaleDateString("en-US", options).replace(",", "");
    option.value = dateStr;
    option.textContent = `${displayDate} - ${note}`;
    allTasksDropdown.appendChild(option);
  }
}

// When dropdown changes, highlight calendar day and show prompt
allTasksDropdown.addEventListener("change", () => {
  const selectedDate = allTasksDropdown.value;
  if (!selectedDate) return;

  // Trigger prompt for editing the task on selected date
  const existingNote = tasks[selectedDate] || "";
  const note = prompt(`Add or edit note for ${selectedDate}:`, existingNote);
  if (note === null) {
    allTasksDropdown.value = "";
    return;
  }

  if (note.trim() === "") {
    delete tasks[selectedDate];
  } else {
    tasks[selectedDate] = note.trim();
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderCalendar(currentYear, currentMonth);
  updateLatestTaskBox();
  populateTasksDropdown();
  allTasksDropdown.value = "";
});

prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentYear, currentMonth);
  updateLatestTaskBox();
});

nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentYear, currentMonth);
  updateLatestTaskBox();
});

// Initial render
renderCalendar(currentYear, currentMonth);
updateLatestTaskBox();
populateTasksDropdown();
