import { defineConfig } from "cypress";
import webpackPreprocessor from "@cypress/webpack-preprocessor";
import path from "node:path";
import { BaseConfig } from './config/base.config';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
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

      // Return the config for proper environment variable handling
      return config;
    },
    ...BaseConfig,
    chromeWebSecurity: false
  }
});