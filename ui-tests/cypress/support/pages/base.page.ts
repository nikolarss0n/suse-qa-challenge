export abstract class BasePage {
	protected abstract elements: Record<string, () => Cypress.Chainable>;

	waitForPageLoad(): void {
		cy.get('body').should('be.visible');
	}

	getElement(key: string): Cypress.Chainable {
		if (!this.elements[key]) {
			throw new Error(`Element '${key}' not found in page elements`);
		}
		return this.elements[key]();
	}

	isElementVisible(key: string): Cypress.Chainable<boolean> {
		return this.getElement(key).should('be.visible').then(() => true);
	}

	hasElement(key: string): Cypress.Chainable<boolean> {
		return this.getElement(key).should('exist').then(() => true);
	}
}