# CabMed - Medical Cabinet Management Platform

## Introduction
CabMed is a comprehensive medical cabinet management platform designed to facilitate the daily management of appointments, patients, payments, and medical records. This application is intended to be used by three types of users: the administrator, the physician, and the medical secretary.

## User Accounts
1. **Admin:**
   - Manages user accounts and access permissions.
   - Monitors overall platform activity.
   - Access to advanced administrative features.

2. **Physician:**
   - Views the appointment calendar.
   - Accesses patients' medical records.
   - Generates certificates, prescriptions, and consultation reports.

3. **Medical Secretary:**
   - Schedules appointments for patients.
   - Manages waiting lists and physicians' availability.
   - Manages patients' administrative information.

## Technologies Used
- **Frontend: ReactJS**
  - Responsive and user-friendly interface.
  - Dynamic data handling for a seamless user experience.

- **Backend: ExpressJS (Node.js)**
  - Robust handling of HTTP requests.
  - Efficient communication with the database.

- **ORM: Sequelize**
  - Abstraction of the relational database.
  - Ease of use for CRUD operations (Create, Read, Update, Delete).

## Key Features
1. **Appointment Management:**
   - Intuitive scheduling of appointments for physicians.
   - Clear display of available time slots.

2. **Patient Management:**
   - Creation and updating of patients' medical records.
   - Tracking of medical history and administrative information.

3. **Payment Management:**
   - Recording patient payments for consultations and medical services.

4. **Certificates and Prescriptions:**
   - Generation and management of medical certificates and prescriptions.

5. **Waiting List:**
   - Efficient organization of patients awaiting appointments.

## How to Use the Application
1. Clone the repository to your local machine.
   ```bash
   git clone https://github.com/ahmedaboutaib/cabmed.git
   ```

2. Install dependencies for the frontend and backend.
   ```bash
   cd cabmed/client
   npm install

   cd ../server
   npm install
   ```

3. Configure the database in the `config/database.js` file using Sequelize.

4. Launch the application.
   ```bash
   cd ../client
   npm run dev

   cd ../server
    npm run watch
   ```

5. Access the application in your browser at [http://localhost:3000](http://localhost:3000).

## Contributions
Contributions to the improvement of CabMed are welcome. Create an issue to discuss new features or bug fixes, and submit pull requests following the project's guidelines.

We hope that CabMed facilitates the management of your medical cabinet and enhances the efficiency of your medical practice.
