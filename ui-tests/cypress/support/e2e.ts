// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import { BaseConfig } from '@/config/base.config'

// Type declarations
declare global {
	namespace Cypress {
		interface Cypress {
			env(key: 'RANCHER_URL'): string
			env(key: 'AUTH_TOKEN'): string
			env(key: 'BASE_URL'): string
			env(key: string): string
		}

		interface Chainable {
			// Add custom commands types here if needed
			login(username: string, password: string): Chainable<void>
			// Add other custom commands as needed
		}
	}
}

// Configuration setup function
function setupGlobalConfig(): void {
	// Individual config settings
	Cypress.config('defaultCommandTimeout', BaseConfig.timeouts.defaultTimeout)
	Cypress.config('pageLoadTimeout', BaseConfig.timeouts.pageLoad)

	// Update the error handling function
	Cypress.on('uncaught:exception', (err, runnable) => {
		// Log the error for debugging
		console.log('Uncaught exception:', err.message)

		// Prevent the error from failing the test
		return false
	})
}

// Request interception setup
function setupRequestInterception(): void {
	// Block tracking and analytics requests with better error handling
	cy.intercept({
		url: /(google-analytics|analytics|doubleclick|gtag|ga|tracking|telemetry)/
	}, (req) => {
		try {
			req.destroy()
		} catch (error) {
			console.log('Error destroying request:', error)
		}
	})

	// Handle the request headers more safely
	cy.intercept('*', (req) => {
		try {
			req.headers['accept-encoding'] = 'gzip, deflate'

			// Safely remove tracking headers
			if (req.headers['x-analytics']) delete req.headers['x-analytics']
			if (req.headers['x-tracking']) delete req.headers['x-tracking']
			if (req.headers['x-telemetry']) delete req.headers['x-telemetry']
		} catch (error) {
			console.log('Error modifying headers:', error)
		}
	})
}

// Initialize configuration
setupGlobalConfig()

// SSL and security configuration
beforeEach(() => {
	// Set up request interception
	setupRequestInterception()

	// Log URL for debugging
	cy.url().then(url => {
		Cypress.log({
			name: 'Current URL',
			message: url
		})
	})
})

// Optional: Add afterEach hook for cleanup if needed
afterEach(() => {
	// Clean up any test-specific state if needed
})