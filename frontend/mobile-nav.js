(function () {
  const isDashboardPage = document.body.classList.contains("dashboard-body");

  if (!isDashboardPage) return;

  const existing = document.getElementById("mobileNavButton");
  if (existing) return;

  const style = document.createElement("style");
  style.innerHTML = `
    .mobile-nav-btn {
      display: none;
    }

    .mobile-nav-panel {
      display: none;
    }

    @media (max-width: 900px) {
      .sidebar {
        display: none !important;
      }

      .main-content {
        margin-left: 0 !important;
        width: 100% !important;
        padding: 18px 12px 90px 12px !important;
        box-sizing: border-box !important;
      }

      .mobile-nav-btn {
        display: flex !important;
        position: fixed;
        right: 18px;
        bottom: 22px;
        z-index: 9999999;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(135deg, #00e5ff, #0ef59b);
        color: #04111f;
        font-size: 28px;
        font-weight: 900;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 28px rgba(0, 229, 255, 0.55);
      }

      .mobile-nav-panel {
        display: none;
        position: fixed;
        left: 14px;
        right: 14px;
        bottom: 98px;
        z-index: 9999998;
        padding: 18px;
        border-radius: 24px;
        background: linear-gradient(135deg, rgba(0, 80, 90, 0.98), rgba(5, 18, 35, 0.98));
        border: 1px solid rgba(0, 229, 255, 0.25);
        box-shadow: 0 0 35px rgba(0, 0, 0, 0.55);
      }

      .mobile-nav-panel.active {
        display: grid !important;
        grid-template-columns: 1fr;
        gap: 12px;
      }

      .mobile-nav-panel h3 {
        margin: 0 0 8px 0;
        color: #00e5ff;
        font-size: 22px;
      }

      .mobile-nav-panel a,
      .mobile-nav-panel button {
        width: 100%;
        padding: 14px 16px;
        border-radius: 16px;
        border: none;
        text-decoration: none;
        font-size: 16px;
        font-weight: 700;
        color: #eaffff;
        background: rgba(255, 255, 255, 0.10);
        text-align: left;
      }

      .mobile-nav-panel a:hover,
      .mobile-nav-panel button:hover {
        background: rgba(0, 229, 255, 0.22);
      }

      .mobile-nav-panel button {
        color: #ffb3c1;
      }
    }
  `;
  document.head.appendChild(style);

  const panel = document.createElement("div");
  panel.className = "mobile-nav-panel";
  panel.id = "mobileNavPanel";

  panel.innerHTML = `
    <h3>MediPlus AI</h3>
    <a href="dashboard.html">Dashboard</a>
    <a href="doctors.html">Doctor Attendance</a>
    <a href="doctor_profiles.html">Doctor Profiles</a>
    <a href="beds.html">Beds</a>
    <a href="profile.html">Profile</a>
    <button id="mobileLogoutBtn">Logout</button>
  `;

  const btn = document.createElement("button");
  btn.className = "mobile-nav-btn";
  btn.id = "mobileNavButton";
  btn.innerHTML = "☰";

  document.body.appendChild(panel);
  document.body.appendChild(btn);

  btn.addEventListener("click", function () {
    panel.classList.toggle("active");
  });

  document.getElementById("mobileLogoutBtn").addEventListener("click", function () {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userType");
    window.location.href = "login.html";
  });
})();