const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'pe6ef4',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/integration/WCT/*.js",
    viewportHeight: 1200,
    viewportWidth: 1920,
  },
});
