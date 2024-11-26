/**
 * Global Cypress E2E test configuration.
 * Sets up test environment, request interception, and type declarations.
 */

import './commands'
import { BaseConfig } from '@/config/base.config'

/**
 * Global type declarations for Cypress namespace
 */
declare global {
	namespace Cypress {
		interface Cypress {
			env(key: 'RANCHER_URL'): string
			env(key: 'AUTH_TOKEN'): string
			env(key: 'BASE_URL'): string
			env(key: string): string
		}

		interface Chainable {
			login(username: string, password: string): Chainable<void>
		}
	}
}

/**
 * Configures global Cypress settings and error handling.
 */
function setupGlobalConfig(): void {
	Cypress.config('defaultCommandTimeout', BaseConfig.timeouts.defaultTimeout)
	Cypress.config('pageLoadTimeout', BaseConfig.timeouts.pageLoad)

	Cypress.on('uncaught:exception', (err, runnable) => {
		console.log('Uncaught exception:', err.message)
		return false
	})
}

/**
 * Sets up request interception for analytics blocking and header management.
 */
function setupRequestInterception(): void {
	cy.intercept({
		url: /(google-analytics|analytics|doubleclick|gtag|ga|tracking|telemetry)/
	}, (req) => {
		try {
			req.destroy()
		} catch (error) {
			console.log('Error destroying request:', error)
		}
	})

	cy.intercept('*', (req) => {
		try {
			req.headers['accept-encoding'] = 'gzip, deflate'

			// Remove tracking headers
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

/**
 * Global test hooks
 */
beforeEach(() => {
	setupRequestInterception()
	cy.url().then(url => {
		Cypress.log({
			name: 'Current URL',
			message: url
		})
	})
})

afterEach(() => {
	// Test cleanup hook
})