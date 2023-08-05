import { defineConfig } from "cypress";
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureWriter(on, config);
      return config;
    },
    video: false,
    baseUrl: 'https://opensource-demo.orangehrmlive.com/',
    defaultCommandTimeout: 36000,
    env: {
      allureLogCypress: false,
      allureReuseAfterSpec: true
    },
    chromeWebSecurity: false,
    includeShadowDom: true

  },
});
