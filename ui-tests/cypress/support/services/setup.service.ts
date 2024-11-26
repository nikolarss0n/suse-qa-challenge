// services/setup.service.ts
import { BaseConfig } from "@/config/base.config";

export class SetupService {
	readonly elements = {
		passwordInput: () => cy.get('[data-testid="local-login-password"]'),
		loginButton: () => cy.get('[data-testid="login-submit"]')
	};

	setupInitialAdmin(password: string): void {
		cy.visit(BaseConfig.routes.login);
		this.elements.passwordInput().type(password);
		this.elements.loginButton().click();
		// Wait for setup to complete
		cy.url().should('include', BaseConfig.routes.dashboard, { timeout: 30000 });
	}
}

export const setupService = new SetupService();