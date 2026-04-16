# 🎓 Campus Grievance Portal

A highly transparent, automated, and secure complaint management system designed to streamline the grievance redressal process between students and college administration. 

Gone are the days of paper applications and lost complaints. This platform digitizes the entire lifecycle of a grievance—from submission to resolution—ensuring complete transparency for the student body and accountability from the respective departments.

---

## ✨ Key Features

### 🧑‍🎓 For Students
* **Universal Transparency Board:** A unified dashboard where students can view all complaints raised across the campus, along with their real-time resolution status. 
* **Targeted Department Routing:** Complaints are categorized and routed directly to the relevant departments (e.g., Academics, Hostel Administration, Maintenance, IT Cell).
* **End-to-End Automated Notifications:** Students receive an immediate email acknowledgment when a complaint is logged, and a final closure email once the department resolves the issue.
* **Secure Access:** Protected login routes using JWT-based authentication to ensure that only verified students can raise issues.

### 👨‍🏫 For Heads of Departments (HODs)
* **Dedicated Departmental Dashboard:** A focused interface for HODs to view only the complaints routed to their specific department.
* **Instant Email Alerts:** The system triggers an automated email to the HOD's official address the moment a new complaint is assigned to their domain.
* **Workflow & Status Management:** HODs can update the status of complaints (`Pending` ➡️ `In-Progress` ➡️ `Resolved`), which instantly reflects on the student dashboard.

---

## 🛠️ Technology Stack

This project is built using a robust full-stack architecture to ensure scalability and fast response times.

* **Frontend:** React.js, Tailwind CSS (for responsive UI), Axios
* **Backend:** Node.js, Express.js (REST API architecture)
* **Database:** MongoDB (utilizing advanced Mongoose schema design and indexing)
* **Authentication:** JSON Web Tokens (JWT) with HttpOnly cookies/headers
* **Communication:** NodeMailer for automated SMTP email dispatching
* **DevOps:** Docker (containerized for consistent deployment environments)

---

## 🏗️ System Architecture & Data Flow

1. **Grievance Generation:** A student fills out the complaint form on the React frontend.
2. **Authorization & Payload Validation:** The Express backend validates the incoming request and verifies the student's JWT access token.
3. **Database Insertion:** The complaint is stored in MongoDB, linked to both the student's ID and the target department.
4. **HOD Alert Trigger:** The backend asynchronously dispatches an email to the HOD notifying them of the new ticket.
5. **Real-time Tracking:** The new complaint populates on the public student dashboard and the specific HOD's private queue.
6. **Resolution & Feedback:** The HOD changes the status to "Resolved". The system updates the database and fires a final resolution email back to the student.

---