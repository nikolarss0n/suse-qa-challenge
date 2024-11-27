#!/bin/bash

echo "Retrieving VM IP from Terraform..."

# Fetch the instance IP and filter out unwanted characters
VM_IP=$(terraform output -raw instance_ip 2>/dev/null | grep -oP '^\d{1,3}(\.\d{1,3}){3}$')

# Check if the IP was retrieved
if [[ -z "$VM_IP" ]]; then
    echo "Error: Unable to retrieve a valid instance IP."
    echo "Debugging Terraform output:"
    terraform output -raw instance_ip 2>/dev/null
    exit 1
fi

echo "Found VM IP: $VM_IP"

# Write to GITHUB_OUTPUT if running in GitHub Actions
if [[ -n "$GITHUB_OUTPUT" ]]; then
    echo "ip=$VM_IP" >> "$GITHUB_OUTPUT"
else
    echo "GITHUB_OUTPUT not set. Running locally. IP: $VM_IP"
fi
