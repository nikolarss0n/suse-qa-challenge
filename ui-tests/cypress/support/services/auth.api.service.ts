// services/auth/auth.api.service.ts
import { BaseConfig } from "@/config/base.config";

export class AuthApiService {
	/**
	 * Make API calls for authentication
	 */
	public loginViaApi(username: string, password: string): Cypress.Chainable<string> {
		return cy.request({
			method: 'POST',
			url: `${BaseConfig.env.RANCHER_URL}/v3-public/localProviders/local?action=login`,
			body: { username, password },
			failOnStatusCode: false
		}).then((response) => {
			if (response.status === 200) {
				return response.body.token;
			}
			throw new Error(`Login failed with status ${response.status}`);
		});
	}

	/**
	 * Set up initial admin user via API
	 */
	public setupAdminUser(bootstrapPassword: string): Cypress.Chainable<Cypress.Response<any>> {
		return this.loginViaApi('', bootstrapPassword).then((token) => {
			return cy.request({
				method: 'POST',
				url: `${BaseConfig.env.RANCHER_URL}/v3/users`,
				headers: {
					'Authorization': `Bearer ${token}`
				},
				body: {
					username: 'admin',
					password: bootstrapPassword,
					name: 'admin'
				}
			}).then((response) => {
				if (response.status !== 200 && response.status !== 201) {
					throw new Error(`Failed to create admin user. Status: ${response.status}`);
				}
				return response;
			});
		});
	}

	/**
	 * Verify if admin user setup was successful
	 */
	public verifyAdminSetup(): Cypress.Chainable<boolean> {
		return cy.request({
			method: 'GET',
			url: `${BaseConfig.env.RANCHER_URL}/v3/users`,
			failOnStatusCode: false
		}).then((response) => {
			return response.status === 200;
		});
	}
}

// Create and export a singleton instance
export const authApiService = new AuthApiService();