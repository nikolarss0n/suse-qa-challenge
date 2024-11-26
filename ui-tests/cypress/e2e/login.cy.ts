import { BaseConfig } from '@/config/base.config';
import { authService } from '@/services/auth.service';
import { dashboardService } from '@/services/dashboard.service';
import { sessionService } from '@/services/session.service';
import type { TestData } from '@/types/test-data';

describe('Rancher Manager E2E Tests', () => {
	before(() => {
		cy.fixture('test-data.json').then((testData) => {
			authService.setupLogin(testData.login.password);
		});
	});

	beforeEach(() => {
		sessionService.clear();
		cy.fixture('test-data.json').as('testData');
	});


	describe('Authentication & Dashboard Access', () => {
		it('successfully authenticates user and verifies dashboard navigation', () => {
			cy.get<TestData>('@testData').then((testData) => {
				// Use AuthService to log in
				authService.login(testData.login.username, testData.login.password);

				// Verify navigation to dashboard
				cy.url().should('include', BaseConfig.routes.dashboard);
			});
		});

		it('verifies main dashboard page loads correctly', () => {
			cy.get<TestData>('@testData').then((testData) => {
				// Use AuthService to log in
				authService.login(testData.login.username, testData.login.password);

				// Verify dashboard elements
				dashboardService.verifyDashboardLoaded();
			});
		});

		it('validates correct page title', () => {
			cy.get<TestData>('@testData').then((testData) => {
				// Use AuthService to log in
				authService.login(testData.login.username, testData.login.password);

				// Verify dashboard title
				dashboardService.verifyPageTitle(testData.expectedTitle);
			});
		});


		it('error handling', () => {
			cy.get<TestData>('@testData').then((testData) => {
				// Attempt login with invalid credentials
				authService.login('invalid', 'invalid');

				// Verify the error message
				authService.verifyLoginMessage(testData.errorMessages.invalidCredentials);
			});
		});
	});
});
