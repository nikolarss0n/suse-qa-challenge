#!/bin/bash

# Step 1: Start the Rancher container
docker run -d --name rancher_test --restart=unless-stopped \
  --privileged \
  -p 80:80 -p 443:443 \
  -e CATTLE_BOOTSTRAP_PASSWORD=adminpassword \
  rancher/rancher:latest

# Step 2: Wait for Rancher to start
echo "Waiting for Rancher to become available..."
until curl -k -s -o /dev/null -w "%{http_code}" https://localhost | grep -q "200"; do
  sleep 5
done
echo "Rancher is ready."

# Step 3: Run Cypress tests
npx cypress run --env CYPRESS_BASE_URL=https://localhost

# Step 4: Cleanup Rancher container
docker stop rancher_test && docker rm rancher_test
