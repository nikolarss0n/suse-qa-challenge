# Rancher Automated Testing Suite

## Overview

This repository provides a comprehensive automated testing solution for validating and verifying Rancher-managed environments. By integrating UI and API tests, the suite ensures robust quality assurance for critical workflows in Rancher instances. The project is designed to work seamlessly within local environments and GitHub Actions CI/CD pipelines, offering scalable and reusable solutions.

## Key Features

* Integrated Testing: Combines UI (Cypress) and API (Go) tests to provide end-to-end coverage.
* Dynamic Environment Management: Automates the provisioning and teardown of Rancher environments using Docker and Terraform.
* CI/CD Integration: Fully automated workflows triggered by GitHub Actions to streamline testing and reporting.
* Scalability: Modular design allows individual or combined execution of UI and API tests.
* Optimized for Reusability: TypeScript-driven UI tests and Go-based API tests provide a robust and maintainable testing framework.

## Project Structure

The repository is organized into the following components:

```
suse-qa-challenge/
├── api-tests/           # API tests implemented in Go
├── ui-tests/            # UI tests implemented with Cypress and TypeScript
├── scripts/            # Helper scripts for Rancher management
├── terraform/          # Infrastructure provisioning using Terraform
├── .github/workflows/  # CI/CD workflows for GitHub Actions
```

## Prerequisites

Ensure the following tools are installed:

* Docker (20.10 or newer)
* Node.js (18.x or newer)
* npm (for managing dependencies in ui-tests/)
* Go (1.21 or newer, for api-tests/)
* Terraform (1.0.0 or newer, for infrastructure provisioning)
* jq (JSON processor, for Rancher scripts)

## Installation

1. Clone the Repository:
```bash
git clone https://github.com/nikolarss0n/suse-qa-challenge.git
cd suse-qa-challenge
```

2. Setup UI Tests:
```bash
cd ui-tests
npm ci
```

3. Setup API Tests: Ensure Go is installed and available on your PATH.

4. Make Rancher Scripts Executable:
```bash
chmod +x scripts/rancher-local.sh
```

## Running Tests

### Local Execution

#### UI Tests

1. Start Rancher:
```bash
npm run rancher:start
```

2. Run Cypress Tests:
   * Open the Cypress UI:
   ```bash
   npm run test:open
   ```
   * Run headlessly:
   ```bash
   npm run test
   ```

3. Stop Rancher:
```bash
npm run rancher:stop
```

#### API Tests

1. Start Rancher and Generate API Tokens:
```bash
./scripts/rancher-local.sh start
```

2. Run API Tests:
```bash
cd api-tests
ginkgo -r
```

3. Stop Rancher:
```bash
./scripts/rancher-local.sh stop
```

### CI/CD Execution

The repository is configured with GitHub Actions workflows for automated testing. These are triggered on push events to main, test/**, or feature/** branches and can also be initiated manually.

#### Triggering the Workflow

1. Navigate to the Actions tab in your GitHub repository.
2. Select the Rancher Test Suite workflow.
3. Click Run workflow and choose the desired test suite (all, ui, or api).

## Configuration

### Environment Variables

The following variables are used for configuration:

* ADMIN_USERNAME: Rancher admin username
* ADMIN_PASSWORD: Rancher admin password
* CYPRESS_BASE_URL: Base URL for the Rancher instance
* CYPRESS_RANCHER_URL: Rancher API URL
* CYPRESS_AUTH_TOKEN: Authentication token for Rancher API

For local development, use cypress.env.json for UI tests:

```json
{
  "ADMIN_USERNAME": "username",
  "ADMIN_PASSWORD": "password"
}
```

### CI/CD Workflow Steps

1. Environment Setup:
   * Spins up a Rancher Docker container.
   * Configures authentication tokens.
2. Dependency Installation:
   * Installs Cypress and Go dependencies.
3. Test Execution:
   * Runs UI and/or API tests based on the trigger.
4. Artifact Upload:
   * Saves test artifacts (e.g., videos, screenshots) for debugging.
5. Cleanup:
   * Stops and removes the Rancher container.

## Reporting

Test results and artifacts are available in:

* Local Runs:
  * Cypress videos and screenshots: ui-tests/cypress/videos and ui-tests/cypress/screenshots
* CI/CD Runs:
  * Available as downloadable artifacts in GitHub Actions.

## Cleanup

To manually stop and clean up Rancher environments, run:

```bash
./scripts/rancher-local.sh stop
```
