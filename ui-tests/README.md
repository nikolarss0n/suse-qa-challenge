# Rancher Test Workflow

## Overview

This testing workflow helps validate and verify Rancher-managed environments through automated testing. Built with Cypress, the UI tests are designed to ensure the functionality, reliability, and performance of critical workflows.

Built on Docker containers and GitHub Actions, this workflow provides automated CI/CD testing using TypeScript. The tests run directly on your Rancher environments to simulate production scenarios and catch real-world issues.

## Key Features

- **Dynamic Rancher Environment Provisioning**: Deploys a Rancher instance via Docker, complete with authentication and environment initialization
- **Enterprise-Grade UI Tests**: Comprehensive Cypress tests with modular, reusable service layers and page objects
- **TypeScript-Driven Configuration**: TypeScript's type system helps catch errors early and makes the code more reliable.
- **GitHub Actions Integration**: Automated testing workflow triggered on feature branches, pull requests, and commits to main
- **Scalable Reporting**: Generates test artifacts

## Prerequisites

- Docker (20.10 or newer) – For containerized Rancher deployments
- Node.js (18.x or newer) – Required for Cypress and supporting scripts
- npm – To manage dependencies

## Installation

### Local Setup

1. Clone the repository:
```bash
git clone https://github.com/nikolarss0n/suse-qa-challenge.git
cd suse-qa-challenge/ui-tests
```

2. Install dependencies:
```bash
npm ci
```

3. Verify Docker is running:
```bash
docker info
```

## Running Tests

### Locally

1. Start the Rancher instance:
```bash
npm run rancher:start
```

2. Run Cypress tests:
- Open Cypress UI:
```bash
npm run test:open
```
- Run headlessly:
```bash
npm run test
```

3. Stop the Rancher instance:
```bash
npm run rancher:stop
```

### CI/CD

Push changes to any of the following branches to trigger the automated workflow:
- `main`
- `test/**`
- `feature/**`

## Folder Structure

```
ui-tests/
├── cypress/             # Cypress test specifications, fixtures, and support files
│   ├── e2e/             # E2E test cases
│   ├── fixtures/        # Test data and mocks
│   ├── support/         # Service layer and helper utilities
├── scripts/             # Shell scripts for local Rancher management
├── config/              # TypeScript configuration for test execution
├── cypress.config.ts    # Cypress configuration
├── package.json         # npm scripts and dependencies
└── tsconfig.json        # TypeScript configuration
```

## GitHub Actions Workflow

The workflow is defined in `.github/workflows/ui-tests.yml`. It performs the following:

1. Code Checkout: Retrieves the latest codebase
2. Environment Provisioning: Spins up a Rancher container, initializes it, and retrieves an authentication token
3. Dependency Installation: Installs Cypress and related dependencies
4. Test Execution: Runs Cypress tests against the Rancher instance
5. Artifact Upload: Stores test artifacts, including videos and screenshots, for debugging
6. Cleanup: Stops and removes the Rancher container

## Configuration

### Environment Variables

The following environment variables are used in the workflow and local runs:
- `ADMIN_USERNAME`: Username credentials
- `ADMIN_PASSWORD`: Password credentials
- `CYPRESS_BASE_URL`: Base URL for the Rancher instance
- `CYPRESS_RANCHER_URL`: Rancher API URL
- `CYPRESS_AUTH_TOKEN`: Authentication token for API interactions
- `NODE_TLS_REJECT_UNAUTHORIZED`: Bypasses TLS verification (for local testing)

### Local development

Local development uses cypress.env.json (gitignored):

```json
{
  "ADMIN_USERNAME": "username",
  "ADMIN_PASSWORD": "password"
}
```

### Reporting

Test results, videos, and screenshots are saved in:
- Local Runs: `cypress/videos` and `cypress/screenshots`
- CI/CD Runs: Available as workflow artifacts in GitHub Actions