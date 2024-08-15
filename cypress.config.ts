import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://192.168.0.40:4200/', 
    specPattern: 'cypress/e2e/integration/**/*.{js,jsx,ts,tsx}',
  },
});
