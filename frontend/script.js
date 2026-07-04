const API_URL = "https://mediplus-ai-1.onrender.com";

if (localStorage.getItem("loggedIn") !== "true") {
  if (!window.location.href.includes("login.html") && !window.location.href.includes("index.html")) {
    window.location.href = "login.html";
  }
}

let currentLanguage = "en";
let chatLanguage = "en";
let patientChartObj = null;
let doctorChartObj = null;

const translations = {
  en: {
    title: "Smart Health Admin Dashboard",
    subtitle: "Real-time PHC/CHC monitoring with AI insights",
    todayPatients: "Today's Patients",
    doctorsPresent: "Doctors Present",
    availableBeds: "Available Beds",
    lowStock: "Low Stock Medicines",
    aiTitle: "AI Predictions",
    patientPredictionLabel: "Tomorrow Patient Footfall",
    medicineRiskLabel: "Medicine Stock Risk",
    predictPatientBtn: "Predict Patients",
    predictMedicineBtn: "Predict Stock",
    alerts: "Critical Alerts",
    chatbot: "MediPlus AI Chatbot",
    placeholder: "Ask about beds, doctors, diseases, patients or medicine stock..."
  },
  te: {
    title: "స్మార్ట్ హెల్త్ అడ్మిన్ డాష్‌బోర్డ్",
    subtitle: "AI ఆధారిత PHC/CHC రియల్ టైమ్ పర్యవేక్షణ",
    todayPatients: "ఈరోజు రోగులు",
    doctorsPresent: "హాజరైన వైద్యులు",
    availableBeds: "అందుబాటులో ఉన్న పడకలు",
    lowStock: "తక్కువ స్టాక్ మందులు",
    aiTitle: "AI అంచనాలు",
    patientPredictionLabel: "రేపటి రోగుల అంచనా",
    medicineRiskLabel: "మెడిసిన్ స్టాక్ రిస్క్",
    predictPatientBtn: "రోగులను అంచనా వేయండి",
    predictMedicineBtn: "స్టాక్ అంచనా వేయండి",
    alerts: "ముఖ్యమైన అలర్ట్స్",
    chatbot: "మెడిప్లస్ AI చాట్‌బాట్",
    placeholder: "పడకలు, వైద్యులు, వ్యాధులు, రోగులు లేదా మందుల గురించి అడగండి..."
  },
  hi: {
    title: "स्मार्ट हेल्थ एडमिन डैशबोर्ड",
    subtitle: "AI आधारित PHC/CHC रियल टाइम निगरानी",
    todayPatients: "आज के मरीज",
    doctorsPresent: "उपस्थित डॉक्टर",
    availableBeds: "उपलब्ध बेड",
    lowStock: "कम स्टॉक दवाएं",
    aiTitle: "AI भविष्यवाणी",
    patientPredictionLabel: "कल के मरीजों का अनुमान",
    medicineRiskLabel: "दवा स्टॉक जोखिम",
    predictPatientBtn: "मरीजों की भविष्यवाणी",
    predictMedicineBtn: "स्टॉक भविष्यवाणी",
    alerts: "महत्वपूर्ण अलर्ट",
    chatbot: "मेडीप्लस AI चैटबॉट",
    placeholder: "बेड, डॉक्टर, बीमारी, मरीज या दवा स्टॉक के बारे में पूछें..."
  }
};

async function loadDashboard() {
  try {
    const res = await fetch(`${API_URL}/dashboard-summary`);

    if (!res.ok) {
      throw new Error("Backend API failed");
    }

    const data = await res.json();

    document.getElementById("todayPatients").innerText = data.patients.today_patients;
    document.getElementById("doctorsPresent").innerText = `${data.doctors.present_doctors}/${data.doctors.total_doctors}`;
    document.getElementById("availableBeds").innerText = data.beds.available_beds;
    document.getElementById("lowStock").innerText = data.medicines.low_stock_medicines;

    document.getElementById("patientPrediction").innerText = "--";
    document.getElementById("medicineRisk").innerText = "--";

    const alertsList = document.getElementById("alertsList");
    alertsList.innerHTML = "";

    data.alerts.forEach(alert => {
      const li = document.createElement("li");
      li.innerText = "⚠ " + alert;
      alertsList.appendChild(li);
    });

    drawPatientChart(data.patients.patient_trend || []);
    drawDoctorChart(data.doctors.present_doctors, data.doctors.absent_doctors);

  } catch (error) {
    console.error("Dashboard load error:", error);

    document.getElementById("todayPatients").innerText = "Error";
    document.getElementById("doctorsPresent").innerText = "Error";
    document.getElementById("availableBeds").innerText = "Error";
    document.getElementById("lowStock").innerText = "Error";

    const alertsList = document.getElementById("alertsList");
    if (alertsList) {
      alertsList.innerHTML = "<li>⚠ Backend connection failed. Please wait because Render free server may be waking up.</li>";
    }
  }
}

async function predictPatients() {
  try {
    document.getElementById("patientPrediction").innerText = "Loading...";

    const res = await fetch(`${API_URL}/predict-patient-footfall`);
    const data = await res.json();

    document.getElementById("patientPrediction").innerText = data.prediction;
  } catch (error) {
    console.error("Patient prediction error:", error);
    document.getElementById("patientPrediction").innerText = "Error";
  }
}

async function predictMedicine() {
  try {
    document.getElementById("medicineRisk").innerText = "Loading...";

    const res = await fetch(`${API_URL}/predict-medicine-stock`);
    const data = await res.json();

    document.getElementById("medicineRisk").innerText = data.risk;

    const msgBox = document.getElementById("medicineMsg");
    if (msgBox) msgBox.innerText = data.message;
  } catch (error) {
    console.error("Medicine prediction error:", error);
    document.getElementById("medicineRisk").innerText = "Error";
  }
}

function drawPatientChart(trend) {
  const ctx = document.getElementById("patientChart");
  if (!ctx) return;

  if (patientChartObj) patientChartObj.destroy();

  patientChartObj = new Chart(ctx, {
    type: "line",
    data: {
      labels: trend.map(item => item.date),
      datasets: [{
        label: "Patients",
        data: trend.map(item => item.count),
        borderWidth: 4,
        tension: 0.4,
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

function drawDoctorChart(present, absent) {
  const ctx = document.getElementById("doctorChart");
  if (!ctx) return;

  if (doctorChartObj) doctorChartObj.destroy();

  doctorChartObj = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Present", "Absent"],
      datasets: [{
        data: [present, absent]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

async function sendChat() {
  const input = document.getElementById("chatInput");
  const msg = input.value.trim();

  if (!msg) return;

  const chatBox = document.getElementById("chatBox");

  const userDiv = document.createElement("div");
  userDiv.className = "user-msg";
  userDiv.innerText = msg;
  chatBox.appendChild(userDiv);

  input.value = "";

  const typing = document.createElement("div");
  typing.className = "bot-msg";
  typing.innerText = "MediPlus AI is typing...";
  chatBox.appendChild(typing);

  try {
    const res = await fetch(`${API_URL}/chatbot`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        message: msg,
        language: chatLanguage
      })
    });

    const data = await res.json();
    typing.innerText = data.reply;
  } catch (error) {
    console.error("Chatbot error:", error);
    typing.innerText = "Backend connection failed. Please try again after a few seconds.";
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}

function changeLanguage() {
  currentLanguage = document.getElementById("language").value;
  const t = translations[currentLanguage];

  document.querySelector(".topbar h1").innerText = t.title;
  document.querySelector(".topbar p").innerText = t.subtitle;

  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.getAttribute("data-key");
    if (t[key]) el.innerText = t[key];
  });

  const chatInput = document.getElementById("chatInput");
  if (chatInput) chatInput.placeholder = t.placeholder;
}

function changeChatLanguage() {
  chatLanguage = document.getElementById("chatLanguage").value;
}

function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("userType");
  window.location.href = "login.html";
}

loadDashboard();
