import { LoginPage } from "@/pages/login.page";

export class AuthService {
	private loginPage: LoginPage;

	constructor() {
		this.loginPage = new LoginPage();
	}

	/**
	 * Perform login workflow
	 */
	login(username: string, password: string): void {
		this.loginPage.visit();
		this.loginPage.login(username, password);
	}

	/**
	 * Perform login workflow
	 */
	setupLogin(password: string): void {
		this.loginPage.visit();
		this.loginPage.setupLogin(password);
	}

	/**
	 * Assert login shows a specific message (e.g., error or success).
	 * @param expectedMessage - The expected login message to assert.
	 */
	verifyLoginMessage(expectedMessage: string): void {
		this.loginPage.elements.errorMessage()
			.should('be.visible')
			.and('contain.text', expectedMessage);
	}

}

export const authService = new AuthService();
