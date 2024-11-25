# Level 1: Rancher UI Testing

## Setup
```bash
mkdir ui-tests
cd ui-tests
npm init -y
npm install cypress@latest
npm install --save-dev eslint eslint-plugin-cypress prettier
```

## Structure
```
ui-tests/
├── cypress/
│   ├── e2e/
│   │   └── login.cy.ts
│   ├── fixtures/
│   │   └── test-data.json
│   ├── support/
│   │   ├── commands.ts
│   │   ├── types/
│   │   │   └── rancher.d.ts
│   │   ├── pages/
│   │   │   └── login.page.ts
│   │   └── services/
│   │       └── auth.service.ts
├── cypress.config.ts
├── tsconfig.json
├── biome.json
├── package.json
└── README.md
```

## Configuration
1. Cypress config:
```javascript
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://localhost',
    defaultCommandTimeout: 10000,
    env: {
      RANCHER_URL: 'https://localhost'
    }
  }
})
```

2. Test execution:
```bash
npx cypress open  # Development
npx cypress run   # CI/CD
```