const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    env: {
      apiKey: 'unime-qualidade-oficial2'
    },
    supportFile: 'cypress/support/e2e.js' // Ou false, se você não precisar do arquivo de suporte
  }
})
