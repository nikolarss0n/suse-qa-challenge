#!/bin/bash

echo "Retrieving VM IP from Terraform..."

# Fetch the instance IP
VM_IP=$(terraform output -raw instance_ip 2>/dev/null)

# Check if the IP was retrieved
if [[ -z "$VM_IP" ]]; then
    echo "Error: Unable to retrieve instance IP. Ensure Terraform outputs are configured correctly."
    exit 1
fi

echo "Found VM IP: $VM_IP"

# Write to GITHUB_OUTPUT if running in GitHub Actions
if [[ -n "$GITHUB_OUTPUT" ]]; then
    echo "ip=$VM_IP" >> "$GITHUB_OUTPUT"
else
    echo "GITHUB_OUTPUT not set. Running locally. IP: $VM_IP"
fi
