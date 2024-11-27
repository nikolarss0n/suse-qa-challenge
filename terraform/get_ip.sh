#!/bin/bash

# Fetch the raw output from Terraform
RAW_OUTPUT=$(terraform output -raw instance_ip 2>/dev/null)

# Extract a valid IPv4 address
VM_IP=$(echo "$RAW_OUTPUT" | grep -oE '([0-9]{1,3}\.){3}[0-9]{1,3}')

# Check if the IP is valid
if [[ -z "$VM_IP" ]]; then
    echo "Error: Unable to retrieve a valid instance IP." >&2
    echo "Debugging Terraform output:" >&2
    echo "$RAW_OUTPUT" >&2
    exit 1
fi

# Output only the IP address
echo "$VM_IP"
