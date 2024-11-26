// cypress.config.ts
import { defineConfig } from "cypress";
import webpackPreprocessor from "@cypress/webpack-preprocessor";
import path from "node:path";

// Define base configuration values here instead of importing from BaseConfig
const baseConfig = {
  apiPath: '/v3',
  routes: {
    login: '/',
    dashboard: '/dashboard'
  },
  timeouts: {
    defaultTimeout: 10000,
    pageLoad: 30000
  }
};

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://localhost:8443',
    env: {
      RANCHER_URL: process.env.CYPRESS_RANCHER_URL || 'https://localhost:8443',
      BASE_URL: process.env.CYPRESS_BASE_URL || 'https://localhost:8443'
    },
    setupNodeEvents(on, config) {
      // Webpack preprocessor configuration
      on("file:preprocessor", webpackPreprocessor({
        webpackOptions: {
          resolve: {
            alias: {
              "@/*": path.resolve(__dirname, "cypress/support"),
              "@/config": path.resolve(__dirname, "config"),
              "@/pages": path.resolve(__dirname, "cypress/support/pages"),
              "@/types": path.resolve(__dirname, "cypress/support/types"),
              "@/services": path.resolve(__dirname, "cypress/support/services"),
            },
            extensions: ['.ts', '.js']
          },
          module: {
            rules: [
              {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                  loader: 'ts-loader'
                }
              }
            ]
          }
        }
      }));

      // Merge environment variables with config
      config.env = {
        ...config.env,
        ...baseConfig
      };

      return config;
    },
    chromeWebSecurity: false,
    ...baseConfig
  }
});