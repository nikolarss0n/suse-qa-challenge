#!/bin/bash

echo "Retrieving VM IP from Terraform..."

# Fetch the raw output from Terraform
RAW_OUTPUT=$(terraform output -raw instance_ip 2>/dev/null)

# Use a portable regex to extract a valid IPv4 address
VM_IP=$(echo "$RAW_OUTPUT" | grep -oE '([0-9]{1,3}\.){3}[0-9]{1,3}')

# Check if the filtered IP is valid
if [[ -z "$VM_IP" ]]; then
    echo "Error: Unable to retrieve a valid instance IP."
    echo "Debugging Terraform output:"
    echo "$RAW_OUTPUT"
    exit 1
fi

echo "Found VM IP: $VM_IP"

# Write to GITHUB_OUTPUT if running in GitHub Actions
if [[ -n "$GITHUB_OUTPUT" ]]; then
    # Ensure the format is strictly 'key=value' with no extra whitespace
    echo "ip=$VM_IP" | sed 's/[[:space:]]//g' >> "$GITHUB_OUTPUT"
else
    echo "GITHUB_OUTPUT not set. Running locally."
    echo "Raw Terraform output: $RAW_OUTPUT"
    echo "Extracted IP: $VM_IP"
fi
