#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." &> /dev/null && pwd )"
CONFIG_PATH="$PROJECT_ROOT/api-tests/config.yml"

# Function to extract the IP address from Terraform output
get_vm_ip() {
    VM_IP=$(terraform -chdir="$PROJECT_ROOT/terraform" output -raw instance_ip 2>&1 | grep -oE '([0-9]{1,3}\.){3}[0-9]{1,3}')
    
    if [[ -z "$VM_IP" ]]; then
        echo -e "${RED}Error: Unable to extract a valid VM IP address from Terraform output.${NC}"
        exit 1
    fi

    echo -e "${GREEN}Successfully extracted VM IP: $VM_IP${NC}"
}

check_docker() {
    if ! docker info >/dev/null 2>&1; then
        echo -e "${RED}Error: Docker is not running${NC}"
        exit 1
    fi
}

check_dependencies() {
    if ! command -v jq &> /dev/null; then
        echo -e "${RED}Error: jq is not installed${NC}"
        echo "Install with: sudo apt-get install jq (Ubuntu/Debian) or brew install jq (macOS)"
        exit 1
    fi
}

generate_token() {
    echo "Waiting for Rancher API to be fully ready..."
    sleep 30

    ADMIN_TOKEN=$(curl -sk "https://$VM_IP:8443/v3-public/localProviders/local?action=login" \
        -H 'content-type: application/json' \
        --data-raw '{"username":"admin","password":"adminpassword"}' \
        | jq -r .token)

    if [ -z "$ADMIN_TOKEN" ] || [ "$ADMIN_TOKEN" = "null" ]; then
        echo -e "${RED}Failed to obtain admin token${NC}"
        exit 1
    fi

    # Store the entire API token response
    API_TOKEN_RESPONSE=$(curl -sk "https://$VM_IP:8443/v3/token" \
        -H 'content-type: application/json' \
        -H "Authorization: Bearer $ADMIN_TOKEN" \
        --data-raw '{"type":"token","description":"api-test-token"}')

    # Extract token and name separately using jq
    TOKEN=$(echo "$API_TOKEN_RESPONSE" | jq -r .token)
    USERNAME=$(echo "$API_TOKEN_RESPONSE" | jq -r .name)

    if [ -z "$TOKEN" ] || [ -z "$USERNAME" ]; then
        echo -e "${RED}Failed to generate API token${NC}"
        exit 1
    fi

    # Extract only the token part after the colon
    ACTUAL_TOKEN="${TOKEN#*:}"

    mkdir -p "$PROJECT_ROOT/api-tests"

    # Generate config file with the correct token format
    cat > "$CONFIG_PATH" << EOF
base_url: "https://$VM_IP:8443"
username: "$USERNAME"
password: "$ACTUAL_TOKEN"
EOF

    if [ -f "$CONFIG_PATH" ]; then
        echo -e "${GREEN}API token generated and config.yml created at $CONFIG_PATH${NC}"
    else
        echo -e "${RED}Failed to create config.yml${NC}"
        exit 1
    fi

    # If running in GitHub Actions, export the necessary variables
    if [ -n "$GITHUB_ENV" ]; then
        echo "API_TOKEN=$ACTUAL_TOKEN" >> "$GITHUB_ENV"
        echo "API_USERNAME=$USERNAME" >> "$GITHUB_ENV"
        echo "CYPRESS_AUTH_TOKEN=$ADMIN_TOKEN" >> "$GITHUB_ENV"
        echo "RANCHER_URL=https://$VM_IP:8443" >> "$GITHUB_ENV"
        echo -e "${GREEN}Environment variables exported to GITHUB_ENV${NC}"
    fi
}

start_rancher() {
    echo "Starting Rancher container..."
    docker run -d --name rancher_test --restart=unless-stopped \
        --privileged \
        -p 8443:443 \
        -e CATTLE_BOOTSTRAP_PASSWORD=adminpassword \
        rancher/rancher:latest

    echo "Waiting for Rancher to become available..."
    until curl -k -s -o /dev/null -w "%{http_code}" "https://$VM_IP:8443/ping" | grep -q "200"; do
        echo -n "."
        sleep 5
    done
    echo -e "\n${GREEN}Rancher is ready at https://$VM_IP:8443${NC}"
    
    generate_token
}

stop_rancher() {
    echo "Stopping Rancher container..."
    docker stop rancher_test
    docker rm rancher_test
    echo -e "${GREEN}Rancher container removed${NC}"
}

# Ensure the script receives an argument
if [ $# -ne 1 ]; then
    echo "Usage: $0 {start|stop}"
    exit 1
fi

case "$1" in
    "start")
        check_docker
        check_dependencies
        get_vm_ip
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
