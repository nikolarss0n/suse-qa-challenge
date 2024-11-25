import { LoginPage } from '@/pages/login.page';
import { DashboardPage } from '@/pages/dashboard.page';
import { BaseConfig } from '@/config/base.config';
import type { TestData } from '@/types/rancher';

describe('Rancher Manager E2E Tests', () => {
	const loginPage = new LoginPage();
	const dashboardPage = new DashboardPage();

	beforeEach(() => {
		cy.fixture('test-data.json').as('testData');
		cy.intercept('POST', `${BaseConfig.apiPath}/v3-public/localProviders/local*`).as('loginRequest');
		cy.intercept('GET', `${BaseConfig.apiPath}/v3/clusters`).as('clustersRequest');
	});

	describe('Authentication & Dashboard Access', () => {
		it('successfully authenticates user', () => {
			cy.get<TestData>('@testData').then((testData) => {
				loginPage.visit();
				loginPage.login(testData.login.username, testData.login.password);

				cy.wait('@loginRequest')
					.its('response.statusCode')
					.should('eq', 200);

				cy.url().should('include', BaseConfig.routes.dashboard);
			});
		});

		it('verifies main dashboard page loads correctly', () => {
			cy.get<TestData>('@testData').then((testData) => {
				loginPage.visit();
				loginPage.login(testData.login.username, testData.login.password);

				dashboardPage.elements.mainContent().should('be.visible');
				dashboardPage.elements.navigationMenu().should('exist');
				dashboardPage.elements.clusterList().should('be.visible');

				cy.wait('@clustersRequest')
					.its('response.statusCode')
					.should('eq', 200);
			});
		});

		it('validates correct page title', () => {
			cy.get<TestData>('@testData').then((testData) => {
				loginPage.visit();
				loginPage.login(testData.login.username, testData.login.password);
				cy.title().should('eq', testData.expectedTitle);
			});
		});
	});

	describe('Error Handling', () => {
		it('handles invalid credentials appropriately', () => {
			loginPage.visit();
			loginPage.login('invalid', 'invalid');
			loginPage.elements.errorMessage()
				.should('be.visible')
				.and('contain', 'Invalid credentials');
		});
	});
});