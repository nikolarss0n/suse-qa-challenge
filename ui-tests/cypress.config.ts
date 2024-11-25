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
              "@/*": ["cypress/support/*"],
              "@/config": path.resolve(__dirname, 'config')
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
    },
    ...BaseConfig
  }
});