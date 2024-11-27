RAW_OUTPUT="34.72.197.138::debug::Terraform exited with code 0."
VM_IP=$(echo "$RAW_OUTPUT" | grep -oE '([0-9]{1,3}\.){3}[0-9]{1,3}')
echo "Sanitized IP: $VM_IP"
