import { BaseConfig } from '@/config/base.config';
import { authService } from '@/services/auth.service';
import { dashboardService } from '@/services/dashboard.service';
import { sessionService } from '@/services/session.service';
import type { TestData } from '@/types/test-data';

describe('Rancher Manager E2E Tests', () => {
	let testData: TestData;

	before(() => {
		// Load test data once before all tests and init setup login
		cy.fixture('test-data.json').then((data) => {
			testData = data;
			authService.setupLogin(testData.login.username, testData.login.password);
		});
	});

	beforeEach(() => {
		// Clear session to ensure a fresh start
		sessionService.clear();

		// Perform standard login
		authService.login(testData.login.username, testData.login.password);
	});

	it('should login into Rancher web page', () => {
		// Click on the user menu and assert the username is displayed
		dashboardService.verifyUsername(testData.login.username);
	});

	it('should check if the main web page opens up', () => {
		// Verify navigation to main web page (dashboard)
		cy.url().should('include', BaseConfig.routes.dashboard);

		// Verify main web page loads correctly
		dashboardService.verifyDashboardLoaded();
	});

	it('should check if the main web page title is correct', () => {
		// Verify that the page title is correct
		dashboardService.verifyPageTitle(testData.expectedTitle);
	});
});
