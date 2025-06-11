<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>SYNCRO Calendar</title>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="calendar.css" />
</head>
<body>
  <!-- Navbar -->
  <div class="navbar">
    <div class="logo">
      <img src="logo.png" alt="SYNCRO Logo" />
      <span>SYNCRO</span>
    </div>
    <div class="user-controls">
      <div class="icon avatar">👤</div>
    </div>
  </div>

  <!-- Sidebar and main content -->
  <div class="container">
    <!-- Sidebar -->
    <div class="sidebar">
      <a href="homepage.php" class="sidebar-link">Home</a>
      <a href="projhomepage.php" class="sidebar-link">Project</a>
      <a href="calendar.php" class="sidebar-link active">Calendar</a>
      <a href="announcement.php" class="sidebar-link">Announcement</a>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <div class="task-header">Current Task:</div>
      <div class="task-box" id="latest-task-box">
        <span>No Task</span> DUE DATE: —
      </div>

      <!-- Dropdown for all notes -->
      <label for="all-tasks-dropdown" class="dropdown-label">All Tasks:</label>
      <select id="all-tasks-dropdown">
        <option value="">-- Select a Task --</option>
      </select>

      <div class="calendar">
        <div class="calendar-controls" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <button id="prev-month">&lt; Prev</button>
          <h2 id="calendar-title">JANUARY 2025</h2>
          <button id="next-month">Next &gt;</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>SUN</th>
              <th>MON</th>
              <th>TUE</th>
              <th>WED</th>
              <th>THU</th>
              <th>FRI</th>
              <th>SAT</th>
            </tr>
          </thead>
          <tbody id="calendar-body">
            <!-- JavaScript  -->
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <script src="calendar.js"></script>
</body>
</html>
