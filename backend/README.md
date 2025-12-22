# Self-Track Backend

The backend service for the Self-Track Workforce Management System.

## Structure
- `src/`: Core Node.js/Express application
  - `controllers/`: API controllers
  - `models/`: Mongoose models
  - `routes/`: API routes
  - `services/`: Business logic
  - `config/`: Configuration
- `ml-service/`: Python FastAPI service for machine learning predictions

## Setup

1. **Install Node dependencies:**
   ```bash
   npm install
   ```

2. **Setup Environment:**
   Copy `ENV_EXAMPLE` to `.env` and fill in your details.
   ```bash
   cp ENV_EXAMPLE .env
   ```

3. **Install Python dependencies (for ML service):**
   ```bash
   cd ml-service
   pip install -r requirements.txt
   cd ..
   ```

## Running the App

### Development
```bash
npm run dev
```
This starts the Node.js server. Ensure your MongoDB is running.

### ML Service
Run the ML service separately:
```bash
cd ml-service
uvicorn app:app --reload --port 8000
```
