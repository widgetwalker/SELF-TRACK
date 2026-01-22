#!/bin/bash

# Self-Track Development Startup Script
# This script helps start all services (MongoDB, Backend, ML Service)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Self-Track Development Startup${NC}"
echo -e "${GREEN}========================================${NC}"

# Check if Docker is running
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed. Please install Docker to use docker-compose.${NC}"
    echo -e "${YELLOW}For manual setup, follow these steps:${NC}"
    echo ""
    echo "1. Start MongoDB:"
    echo "   mongod (or MongoDB service on your system)"
    echo ""
    echo "2. Start Backend (in backend/ directory):"
    echo "   npm install && npm run dev"
    echo ""
    echo "3. Start ML Service (in backend/ml-service directory):"
    echo "   pip install -r requirements.txt"
    echo "   uvicorn app:app --reload --port 8000"
    echo ""
    exit 1
fi

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}docker-compose is not installed.${NC}"
    exit 1
fi

# Check if .env exists in backend
if [ ! -f backend/.env ]; then
    echo -e "${YELLOW}Creating .env file from example...${NC}"
    cp backend/ENV_EXAMPLE backend/.env
    echo -e "${GREEN}.env created. Please update with your settings if needed.${NC}"
fi

# Start services with docker-compose
echo -e "${YELLOW}Starting services with docker-compose...${NC}"
echo ""

docker-compose up --build

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Services Started!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Frontend:       http://localhost:5173 (or open frontend/1-homepage/index.html)"
echo "Backend API:    http://localhost:5000"
echo "ML Service:     http://localhost:8000"
echo "MongoDB:        localhost:27017"
echo ""
echo "Logs:"
echo "  docker-compose logs -f backend      # Backend logs"
echo "  docker-compose logs -f ml-service   # ML Service logs"
echo "  docker-compose logs -f mongodb      # MongoDB logs"
echo ""
echo "Stop services: Ctrl+C or run 'docker-compose down'"
echo ""
