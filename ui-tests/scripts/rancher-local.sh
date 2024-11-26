#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Function to check if docker is running
check_docker() {
    if ! docker info >/dev/null 2>&1; then
        echo -e "${RED}Error: Docker is not running${NC}"
        exit 1
    fi
}

# Function to start Rancher
start_rancher() {
    echo "Starting Rancher container..."
    docker run -d --name rancher_test --restart=unless-stopped \
        --privileged \
        -p 80:80 -p 443:443 \
        -e CATTLE_BOOTSTRAP_PASSWORD=adminpassword \
        rancher/rancher:latest

    # Wait for Rancher to be ready
    echo "Waiting for Rancher to become available..."
    until curl -k -s -o /dev/null -w "%{http_code}" https://localhost | grep -q "200"; do
        echo -n "."
        sleep 5
    done
    echo -e "\n${GREEN}Rancher is ready at https://localhost${NC}"
}

# Function to stop and remove Rancher
stop_rancher() {
    echo "Stopping Rancher container..."
    docker stop rancher_test
    docker rm rancher_test
    echo -e "${GREEN}Rancher container removed${NC}"
}

# Main script logic
case "$1" in
    "start")
        check_docker
        start_rancher
        ;;
    "stop")
        check_docker
        stop_rancher
        ;;
    *)
        echo "Usage: $0 {start|stop}"
        exit 1
        ;;
esac