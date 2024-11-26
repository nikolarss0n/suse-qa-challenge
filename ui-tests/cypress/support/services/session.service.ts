/**
 * Service class managing browser session state.
 */
export class SessionService {
	/**
	 * Clears all browser storage mechanisms: cookies, localStorage, and sessionStorage.
	 * Used for cleaning up between test runs.
	 */
	clear(): void {
		cy.clearCookies();
		cy.clearLocalStorage();
		cy.window().then((win) => win.sessionStorage.clear());
	}
}

export const sessionService = new SessionService();