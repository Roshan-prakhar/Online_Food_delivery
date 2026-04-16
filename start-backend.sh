#!/bin/bash
# ========================================
# Start Foodies API Backend
# ========================================
# This script starts the Spring Boot API server

echo ""
echo "Starting Foodies API Backend..."
echo ""

cd foodiesapi

# Check if mvn exists
if ! command -v mvn &> /dev/null; then
    echo "ERROR: Maven is not installed or not in PATH"
    echo "Please install Maven from https://maven.apache.org/"
    exit 1
fi

# Start the backend
echo "Running: mvn spring-boot:run"
mvn spring-boot:run

if [ $? -ne 0 ]; then
    echo ""
    echo "ERROR: Failed to start the backend"
    echo "Check the output above for details"
    exit 1
fi
