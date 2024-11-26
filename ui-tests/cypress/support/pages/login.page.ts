/**
 * Page object representing the login interface.
 * Handles user authentication flows including initial login and setup.
 */
import { BaseConfig } from "@/config/base.config";
import { BasePage } from "@/pages/base.page";

export class LoginPage extends BasePage {
	/**
	 * Map of element identifiers to their corresponding test IDs.
	 * @protected
	 */
	protected selectors = {
		usernameInput: '[data-testid="local-login-username"]',
		passwordInput: '[data-testid="local-login-password"]',
		loginButton: '[data-testid="login-submit"]',
		errorMessage: '[data-testid="login__messages"]',
		userAgreementCheckbox: '[data-testid="setup-agreement"] > .checkbox-container > .checkbox-custom',
		setupSubmitButton: '[data-testid="setup-submit"]'
	};

	/**
	 * Navigates to the login page.
	 */
	visit(): void {
		cy.visit(BaseConfig.routes.login);
	}

	/**
	 * Types the username into the username input field.
	 * @param username - The username to enter
	 */
	typeUsername(username: string): void {
		this.getElement('usernameInput').type(username);
	}

	/**
	 * Types the password into the password input field.
	 * @param password - The password to enter
	 */
	typePassword(password: string): void {
		this.getElement('passwordInput').type(password);
	}

	/**
	 * Clicks the login button to submit credentials.
	 */
	clickLoginButton(): void {
		this.getElement('loginButton').click();
	}

	/**
	 * Accepts the user agreement by clicking the checkbox.
	 */
	acceptUserAgreement(): void {
		this.getElement('userAgreementCheckbox').click();
	}

	/**
	 * Clicks the setup submit button to complete setup process.
	 */
	clickSetupSubmitButton(): void {
		this.getElement('setupSubmitButton').click();
	}

	/**
	 * Performs standard login flow with username and password.
	 * @param username - The username to login with
	 * @param password - The password to login with
	 */
	login(username: string, password: string): void {
		this.typeUsername(username);
		this.typePassword(password);
		this.clickLoginButton();
	}

	/**
	 * Performs setup login flow with just password.
	 * @param password - The password to login with
	 */
	setupLogin(password: string): void {
		this.typePassword(password);
		this.clickLoginButton();
		this.acceptUserAgreement();
		this.clickSetupSubmitButton();
	}

	/**
	 * Handles login flow by detecting whether username input exists.
	 * Uses standard login if username field present, setup login if not.
	 * @param username - The username to login with
	 * @param password - The password to login with
	 * @throws {Error} If password input is not visible within timeout
	 */
	conditionalLogin(username: string, password: string): void {
		this.getElement('passwordInput', { timeout: 10000 }).should('be.visible');

		cy.get('body').then(($body) => {
			if ($body.find(this.selectors.usernameInput).length > 0) {
				cy.log('Username input exists: proceeding with username input.');
				this.login(username, password);
			} else {
				cy.log('Username input does not exist: proceeding without username.');
				this.setupLogin(password);
			}
		});
	}
}