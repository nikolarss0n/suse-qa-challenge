#!/bin/bash

echo "Retrieving VM IP from Terraform..."

# Fetch the raw output from Terraform
RAW_OUTPUT=$(terraform output -raw instance_ip 2>/dev/null)

# Extract a valid IPv4 address
VM_IP=$(echo "$RAW_OUTPUT" | grep -oE '([0-9]{1,3}\.){3}[0-9]{1,3}')

# Check if the IP is valid
if [[ -z "$VM_IP" ]]; then
    echo "Error: Unable to retrieve a valid instance IP."
    echo "Debugging Terraform output:"
    echo "$RAW_OUTPUT"
    exit 1
fi

echo "Found VM IP: $VM_IP"

# Just print the IP for direct usage in the workflow
echo "$VM_IP"
