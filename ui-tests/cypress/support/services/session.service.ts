export class SessionService {
	/**
	 * Clears cookies, local storage, and session storage.
	 */
	clear(): void {
		cy.clearCookies();
		cy.clearLocalStorage();
		cy.window().then((win) => win.sessionStorage.clear());
	}
}

export const sessionService = new SessionService();
