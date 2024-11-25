import { BaseConfig } from "@/config/base.config";
import { BasePage } from "@/pages/base.page";

export class LoginPage extends BasePage {
	readonly elements = {
		usernameInput: () => cy.get('[data-testid="local-login-username"]'),
		passwordInput: () => cy.get('[data-testid="local-login-password"]'),
		loginButton: () => cy.get('[data-testid="login-submit"]'),
		errorMessage: () => cy.get('[data-testid="login__messages"]')
	};

	visit(): void {
		cy.visit(BaseConfig.routes.login);
	}

	login(username: string, password: string): void {
		this.elements.usernameInput().type(username);
		this.elements.passwordInput().type(password);
		this.elements.loginButton().click();
	}
}