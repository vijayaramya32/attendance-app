# attendance-app
for front-end
cd attendance-frontend
npm install
or 
yarn install
start the front-End
npm start
or 
yarn start
React Ui will run at
http://localhost:5000
.env.example:REACT_APP_API_URL=http://localhost:5000/api
ouput photos:


Working application:
Frontend (React.js)

Pages / Components
Login.jsx – Employee/Admin login page.
Register.jsx – Employee registration page.
Navbar.jsx – Navigation bar for switching between modules.
Profile.jsx – Employee profile details.
ManagerDashboard.jsx – Admin/Manager dashboard with analytics.
Reports.jsx – Attendance and training reports.
TeamCalendarView.jsx – Calendar view of team attendance/training schedules.
AttendanceCard.jsx – Individual attendance/training record display card.
MyHistory.jsx – Personal training/attendance history (based on PDF, not yet provided fully).

Features
Dashboard shows total employees, attendance stats, training completion.
Users can mark attendance or track training completion.
Managers can view team reports and calendars.
Pagination, sorting, and search for training sessions and employees.
Responsive UI (desktop view first, mobile optional later).


Backend (Node.js + Express + MongoDB)

Server

server.js sets up Express server, connects to MongoDB.
Routes for login, registration, attendance, training records, reports.
Database
MongoDB collections:
Users – employee/admin information.
Attendance – daily attendance records.
TrainingSessions – training session details.
EmployeeTrainingRecords – mapping of employees to training sessions and completion status.


Environment Variables (.env)
PORT – Server port.

3. Working Application Flow

Login/Authentication
Users log in using email & password.
Role-based access: Admin/Employee.
Employee Dashboard
View personal profile.
Track attendance & training completion.
Manager/Admin Dashboard
View all employee attendance & training stats.
Generate reports, view team calendar.
Database Operations
Attendance/training updates reflected in MongoDB.

seed data(users& collection)
[
{
  "_id":"u001",
  "name": "VijayaRamya Maddipudi",
  "email": "vijayaramya@example.com",
  "password": "hashed_password_1",
  "role": "employee",
  "department": "Software",
   "joiningDate": "2023-01-10"
  },
  {
  "_id":u002",
  "name": "Ramesh Kumar",
    "email": "ramesh@example.com",
    "password": "hashed_password_2",
    "role": "employee",
    "department": "HR",
    "joiningDate": "2022-11-05"
  },
]
collection:
[
  {
    "_id": "a001",
    "userId": "u001",
    "date": "2025-11-28",
    "status": "Present"
  },
  {
    "_id": "a002",
    "userId": "u002",
    "date": "2025-11-28",
    "status": "Absent"
  },
]



