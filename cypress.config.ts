import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'e6jd58',
  chromeWebSecurity: false,
  video: false,
  videoUploadOnPasses: false,
  screenshotOnRunFailure: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts')(on, config);
    },
    baseUrl: 'https://portail.qa.cqgc.hsj.rtss.qc.ca/',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    slowTestThreshold: 60000
  },
  retries: {
    "runMode": 2,
    "openMode": 0
  }
});
