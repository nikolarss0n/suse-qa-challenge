/**
 * Abstract base class for implementing the Page Object pattern in Cypress tests.
 * Provides core functionality for element interactions and page state verification.
 * 
 * @abstract
 */
export abstract class BasePage {
	/**
	 * Map of element identifiers to their corresponding CSS selectors.
	 * Must be implemented by derived classes.
	 * @protected
	 */
	protected abstract selectors: Record<string, string>;

	/**
	 * Waits for the page to be fully loaded and visible.
	 * @throws {Error} If page body is not visible within default timeout
	 */
	waitForPageLoad(): void {
		cy.get('body').should('be.visible');
	}

	/**
	 * Retrieves a Cypress element chain for the specified selector key.
	 * 
	 * @param key - The identifier for the selector in the selectors map
	 * @param options - Optional Cypress command options for timeout and logging
	 * @returns Cypress chain for the requested element
	 * @throws {Error} If the specified selector key doesn't exist
	 */
	getElement(key: string, options?: Partial<Cypress.Timeoutable & Cypress.Loggable>): Cypress.Chainable {
		const selector = this.selectors[key];
		if (!selector) {
			throw new Error(`Selector '${key}' not found in page selectors`);
		}
		return cy.get(selector, options);
	}

	/**
	 * Checks if an element is visible on the page.
	 * 
	 * @param key - The identifier for the selector in the selectors map
	 * @returns Promise resolving to true if element is visible
	 * @throws {Error} If element doesn't exist or is not visible within timeout
	 */
	isElementVisible(key: string): Cypress.Chainable<boolean> {
		return this.getElement(key).should('be.visible').then(() => true);
	}

	/**
	 * Verifies if an element exists in the DOM.
	 * 
	 * @param key - The identifier for the selector in the selectors map
	 * @returns Promise resolving to true if element exists
	 * @throws {Error} If element doesn't exist within timeout
	 */
	hasElement(key: string): Cypress.Chainable<boolean> {
		return this.getElement(key).should('exist').then(() => true);
	}
}