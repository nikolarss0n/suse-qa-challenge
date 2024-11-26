/**
 * Service class handling authentication workflows and verification.
 */
import { LoginPage } from "@/pages/login.page";
import { dashboardService } from "./dashboard.service";

export class AuthService {
	/**
	 * Login page instance for handling authentication UI interactions.
	 * @private
	 */
	private loginPage: LoginPage;

	/**
	 * Initializes a new instance of AuthService.
	 */
	constructor() {
		this.loginPage = new LoginPage();
	}

	/**
	 * Executes complete setup login workflow including dashboard verification.
	 * @param username - User's login username
	 * @param password - User's login password
	 * @throws {Error} If dashboard banner fails to load after login
	 */
	setupLogin(username: string, password: string): void {
		this.loginPage.visit();
		this.loginPage.conditionalLogin(username, password);
		dashboardService.verifyBannerLoaded()
	}

	/**
	 * Executes standard login workflow.
	 * @param username - User's login username
	 * @param password - User's login password
	 */
	login(username: string, password: string): void {
		this.loginPage.visit();
		this.loginPage.login(username, password);
	}

	/**
	 * Verifies login message matches expected text.
	 * @param expectedMessage - Message text to verify
	 * @throws {Error} If message is not visible or does not contain expected text
	 */
	verifyLoginMessage(expectedMessage: string): void {
		this.loginPage.getElement('errorMessage')
			.should('be.visible')
			.and('contain.text', expectedMessage);
	}
}

export const authService = new AuthService();