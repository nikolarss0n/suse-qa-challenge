#!/bin/bash

# Save as test_ip_extract.sh
echo "Testing IP extraction methods..."

# Create sample output like our real script
echo "Testing IP retrieval methods...
Method 1 - Direct terraform output:
\"34.123.45.67\"
Method 2 - Raw output:
34.123.45.67
Method 3 - With cleanup:
Cleaned IP: 34.123.45.67
Valid IP format: 34.123.45.67" > test_output.txt

echo "1. Using grep for IP pattern:"
IP1=$(grep -oE '[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+' test_output.txt | head -1)
echo "Found IP1: $IP1"

echo -e "\n2. Using Method 2 output:"
IP2=$(grep "Method 2 - Raw output:" -A 1 test_output.txt | tail -1)
echo "Found IP2: $IP2"

echo -e "\n3. Using Cleaned IP line:"
IP3=$(grep "Cleaned IP:" test_output.txt | cut -d' ' -f3)
echo "Found IP3: $IP3"

# Now let's add some GitHub Actions noise
echo -e "\nTesting with GitHub Actions style output..."
echo "Testing IP retrieval methods...
Method 1 - Direct terraform output:
[command]/home/runner/work/_temp/xyz/terraform-bin output instance_ip
\"34.123.45.67\"
Method 2 - Raw output:
[command]/home/runner/work/_temp/xyz/terraform-bin output -raw instance_ip
34.123.45.67::debug::Terraform exited with code 0.
Method 3 - With cleanup:
Cleaned IP: 34.123.45.67::debug::Terraform exited with code 0.
Valid IP format: 34.123.45.67" > test_output_gh.txt

echo "4. Testing with GitHub Actions output:"
IP4=$(grep -oE '[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+' test_output_gh.txt | head -1)
echo "Found IP4: $IP4"