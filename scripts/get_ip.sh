#!/bin/bash

echo "Testing IP retrieval methods..."

# Method 1 - Direct terraform output
echo "Method 1 - Direct terraform output:"
cd terraform
terraform output instance_ip

# Method 2 - Raw output
echo "Method 2 - Raw output:"
terraform output -raw instance_ip

# Method 3 - With cleanup
echo "Method 3 - With cleanup:"
IP=$(terraform output -raw instance_ip)
echo "Cleaned IP: $IP"

# Test if IP is valid and connectivity
if [[ $IP =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Valid IP format: $IP"
    echo "Testing connectivity..."
    curl -k -I "https://$IP"
else
    echo "Invalid IP format: $IP"
fi