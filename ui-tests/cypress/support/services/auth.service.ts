import type { LoginResponse, RancherUser } from '@/types/rancher';

export class AuthService {
	private baseUrl: string;

	constructor() {
		this.baseUrl = Cypress.env('RANCHER_URL') || 'https://localhost';
	}

	login(username: string, password: string): Cypress.Chainable<LoginResponse> {
		return cy.request({
			method: 'POST',
			url: `${this.baseUrl}/v3-public/localProviders/local?action=login`,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: {
				username,
				password,
				responseType: 'cookie',
				description: 'UI Automation Login'
			},
			failOnStatusCode: false
		}).then(response => response.body);
	}

	verifyAuthStatus(): Cypress.Chainable<boolean> {
		return cy.request({
			method: 'GET',
			url: `${this.baseUrl}/v3/settings`,
			headers: {
				'Accept': 'application/json'
			},
			failOnStatusCode: false
		}).then(response => response.status === 200);
	}

	getCurrentUser(): Cypress.Chainable<RancherUser> {
		return cy.request({
			method: 'GET',
			url: `${this.baseUrl}/v3/users?me=true`,
			headers: {
				'Accept': 'application/json',
				'Cookie': Cypress.env('authCookie')
			}
		}).then(response => response.body);
	}

	logout(): Cypress.Chainable<void> {
		return cy.request({
			method: 'POST',
			url: `${this.baseUrl}/v3/tokens?action=logout`,
			headers: {
				'Accept': 'application/json',
				'Cookie': Cypress.env('authCookie')
			},
			failOnStatusCode: false
		}).then(() => undefined);
	}
}

export const authService = new AuthService();