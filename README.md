# MediPlus AI

## Real-Time AI Management for PHC/CHC Healthcare Operations

MediPlus AI is an AI-driven smart healthcare management system designed for Primary Health Centres (PHCs) and Community Health Centres (CHCs). It provides real-time monitoring of patient footfall, doctor attendance, bed availability, medicine stock levels, and operational alerts through a centralized admin dashboard.

The system helps healthcare administrators make faster decisions by combining dashboard analytics, machine learning predictions, multilingual chatbot support, and CSV-based healthcare data management.

---

## Problem Statement

PHCs and CHCs often face recurring operational challenges such as:

- Medicine stock-outs
- Unmanaged patient footfall
- Bed unavailability
- Unpredictable doctor attendance
- Manual record tracking
- Lack of real-time visibility for administrators

These issues can lead to delays in treatment, poor resource allocation, and reduced healthcare efficiency.

---

## Proposed Solution

MediPlus AI provides a real-time smart health dashboard that allows administrators to monitor and manage key healthcare resources in one place.

The platform includes:

- Patient footfall monitoring
- Tomorrow patient footfall prediction
- Doctor attendance tracking
- Doctor profile management
- Bed availability analytics
- Medicine stock analytics
- Low, medium, and high medicine stock classification
- Critical operational alerts
- Multilingual chatbot support
- Admin and doctor login system

---

## Key Features

### Admin Dashboard

The dashboard displays real-time healthcare statistics such as:

- Today’s patient count
- Doctors present
- Available beds
- Low stock medicines
- AI predictions
- Doctor attendance chart
- Patient footfall trend
- Critical alerts
- Chatbot support

---

### AI Predictions

MediPlus AI uses machine learning models for:

- Tomorrow patient footfall prediction
- Medicine stock risk prediction

These predictions help administrators prepare hospital resources in advance.

---

### Doctor Attendance Management

The system tracks:

- Total doctors
- Present doctors
- Absent doctors
- Attendance percentage
- Doctor-wise attendance details

Doctor data is read from CSV files and displayed in a professional dashboard view.

---

### Bed Availability Analytics

The bed module shows:

- Total beds
- Available beds
- Occupied beds
- Bed occupancy percentage
- Beds required based on occupancy

This helps administrators understand hospital bed capacity quickly.

---

### Medicine Stock Analytics

The medicine analytics page provides detailed medicine-level stock classification.

It shows:

- Total medicines
- Low stock medicines
- Medium stock medicines
- High stock medicines
- Overall medicine stock risk
- Medicine-wise stock table

Medicine stock is classified as:

- Low Stock: Below 50 units
- Medium Stock: 50 to 150 units
- High Stock: Above 150 units

---

### Multilingual Chatbot

MediPlus AI includes a chatbot that supports:

- English
- Telugu
- Hindi

The chatbot can answer questions related to:

- Beds
- Doctors
- Patients
- Medicine stock
- Alerts
- Diseases such as malaria, dengue, cholera, and fever

---

### Login System

The project supports:

- Admin login
- Doctor login using Doctor ID and Password from CSV

After doctor login, the profile page dynamically displays the logged-in doctor’s details.

---

## Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- Chart.js

### Backend

- Python
- FastAPI
- Uvicorn

### Machine Learning

- Scikit-learn
- Joblib
- Pandas
- NumPy

### Storage

- CSV datasets

### Deployment

- Frontend: Netlify
- Backend: Render

---

## Project Structure

```text
mediplus_ai/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   │
│   ├── datasets/
│   │   ├── patient_visits.csv
│   │   ├── doctor_attendance.csv
│   │   ├── bed_management.csv
│   │   ├── medicine_inventory.csv
│   │   └── doctor_login_credentials.csv
│   │
│   └── models/
│       ├── patient_footfall_model.pkl
│       └── medicine_stock_model.pkl
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   ├── doctors.html
│   ├── doctor_profiles.html
│   ├── beds.html
│   ├── medicines.html
│   ├── profile.html
│   ├── style.css
│   └── script.js
│
├── .gitignore
└── README.md
