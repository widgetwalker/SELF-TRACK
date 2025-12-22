# Self-Tracking & Workforce Management Platform

This repository houses the entire Self-Tracking platform, including the backend API, ML services, and frontend applications.

## Repository Structure (`main` branch)

This `main` branch uses a monorepo structure to organize all components:

- **`backend/`**: Node.js/Express API server and ML services
  - `src/`: Core backend logic (formerly root-level files)
  - `ml-service/`: Python ML microservices
- **`frontend/`**: React/React Native application
- **`docs/`**: Project documentation and PRD
- **`infrastructure/`**: Docker and deployment configurations
- **`database/`**: Database migrations and seeds

## Branch Workflow & Merging

We maintain separate active development branches. The `main` branch is the integration hub.

### For Team Members
Continue working in your dedicated branches:
- **`back-end`**: Active backend development
- **`front-end`**: Active frontend development

### Merging to Main
When merging `back-end` or `front-end` into `main`, Git will automatically handle file moves.

**To merge backend changes:**
```bash
git checkout main
git merge back-end
```
*Note: If merge conflicts occur due to file moves, Git usually resolves them intelligently. If files appear as "New" in the root, simply move them to `backend/src/`.*

### Setup & Run
See detailed instructions in:
- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)