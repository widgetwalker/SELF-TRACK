<br />
<div align="center">
  <h1 align="center">Self-Track</h1>

  <p align="center">
    A centralized, transparent, and intelligent workforce management system.
    <br />
    <a href="./docs/reference/PRD_Workforce_Platform.md"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="#demo">View Demo</a>
    ·
    <a href="#issues">Report Bug</a>
    ·
    <a href="#issues">Request Feature</a>
  </p>
</div>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
![GitHub issues](https://img.shields.io/github/issues/widgetwalker/SELF-TRACK)
![GitHub pull requests](https://img.shields.io/github/issues-pr/widgetwalker/SELF-TRACK)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

</div>

---

## 📋 About The Project

**Self-Track** is a modern solution designed to bridge the gap between employee autonomy and organizational transparency. By integrating task management, HR processes, and skill development into a single platform, we empower organizations to foster a culture of growth and efficiency.

### 🌟 Key Features

*   **🎯 Smart Task Management**: Prioritized feeds, deadlines, and project grouping.
*   **🏖️ Seamless HR Integration**: One-click leave requests and instant salary slip access.
*   **📈 Skill Growth**: Track proficiency, validate skills, and visualize career progression.
*   **🤖 AI-Powered Insights**:
    *   *Productivity Scoring*: ML models analyze output and habits.
    *   *Burnout Detection*: Early warning system for employee well-being.
    *   *Anomaly Detection*: Identifies irregular patterns in workflow.

---

## 🛠️ Built With

This project leverages a robust tech stack to ensure scalability and performance.

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | ![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white) | Modern SPA with routing |
| **Backend** | ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=flat&logo=express&logoColor=%2361DAFB) | RESTful API & Business Logic |
| **ML Service** | ![Python](https://img.shields.io/badge/python-3670A0?style=flat&logo=python&logoColor=ffdd54) ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi) | Predictive Models & Analytics |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white) | NoSQL Data Persistence |
| **DevOps** | ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white) | Containerization |

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

*   **[Node.js](https://nodejs.org/)** (v18+)
*   **[Python](https://www.python.org/)** (v3.11+)
*   **[MongoDB](https://www.mongodb.com/)**: Ensure your local MongoDB instance is running on `localhost:27017`.
*   **[Docker](https://www.docker.com/)** (optional, for containerized setup)

### ⚡ Quick Start

**Windows:**
```sh
start.bat
```

**Linux/Mac (Docker):**
```sh
./startup.sh
```

This starts all three services (Frontend, Backend, ML Service) with a single command!

### Installation (Manual Setup)

1.  **Clone the repo**
    ```sh
    git clone https://github.com/widgetwalker/SELF-TRACK.git
    cd SELF-TRACK
    ```

2.  **Backend Setup**
    ```sh
    cd backend
    npm install
    cp ENV_EXAMPLE .env
    # Update .env with your MongoDB URI
    ```

3.  **Frontend Setup**
    ```sh
    cd frontend
    npm install
    # Create .env file (optional)
    echo REACT_APP_API_BASE_URL=http://localhost:5000 > .env
    ```

4.  **ML Service Setup**
    ```sh
    cd backend/ml-service
    pip install -r requirements.txt
    ```

### ▶️ Running the Application (Manual)

1.  **Start the Backend API** (from /backend directory)
    ```sh
    npm run dev
    ```
    *Server runs on **http://localhost:5000**.*

2.  **Start the ML Service** (from /backend/ml-service directory)
    ```sh
    py -m uvicorn app:app --reload --port 8000
    ```
    *Service runs on **http://localhost:8000**.*

3.  **Start the Frontend** (from /frontend directory)
    ```sh
    npm start
    ```
    *React app runs on **http://localhost:3000**.*

4.  **Access the Application**
    - Homepage: http://localhost:3000
    - Login: http://localhost:3000/login
    - Dashboard: http://localhost:3000/dashboard

---

## 🔗 Integration Details

All three components (Frontend, Backend, ML Service) are **fully integrated and operational**:

✅ **Frontend → Backend**: Centralized API client (`frontend/src/api-client-improved.js`) with retry logic and error handling  
✅ **Backend ↔ ML Service**: Integrated with timeout, retry logic, and graceful fallbacks  
✅ **Backend ↔ Database**: Mongoose models persist all data to MongoDB Atlas  
✅ **Error Handling**: Comprehensive error handling with user-friendly messages  
✅ **Orchestration**: One-command startup via `start.bat` (Windows) or `startup.sh` (Linux/Mac)  

**👉 [See INTEGRATION_GUIDE.md for complete documentation →](./docs/guides/INTEGRATION_GUIDE.md)**

---

## 🗺️ Roadmap

- [x] **Phase 1: Foundation**
    - [x] Monorepo Structure
    - [x] Basic Auth & Role Management
    - [x] Task CRUD
- [x] **Phase 2: Intelligence**
    - [x] ML Service Integration
    - [ ] Advanced Analytics Dashboard
    - [ ] Email Notifications
- [x] **Phase 3: Frontend**
    - [x] React Web App
    - [ ] Mobile App (React Native)

See the [open issues](https://github.com/widgetwalker/SELF-TRACK/issues) for a full list of proposed features.

---

## 🤝 Team Workflow

We use a **Main Branch Integration** workflow.

*   `main`: Stable, integration branch.
*   `back-end`: Active backend development.
*   `front-end`: Active frontend development.

**Merging:**
When merging feature branches to `main`, Git handles the directory structure changes automatically. Always resolve conflicts by preserving the new folder structure (`backend/src/...`).

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📞 Contact

Project Team - [GitHub Profile](https://github.com/widgetwalker)

Project Link: [https://github.com/widgetwalker/SELF-TRACK](https://github.com/widgetwalker/SELF-TRACK)

<!-- README Updated by AntiGravity - Latest Version -->
