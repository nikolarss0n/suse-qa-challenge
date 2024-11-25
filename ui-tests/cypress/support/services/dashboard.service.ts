import { DashboardPage } from "@/pages/dashboard.page";

export class DashboardService {
	private dashboardPage: DashboardPage;

	constructor() {
		this.dashboardPage = new DashboardPage();
	}

	/**
	 * Verify the dashboard is loaded by checking key UI elements
	 */
	verifyDashboardLoaded(): void {
		this.dashboardPage.verifyDashboardLoaded();
	}

	/**
	 * Verify the page title
	 */
	verifyPageTitle(expectedTitle: string): void {
		cy.title().should('eq', expectedTitle);
	}
}

export const dashboardService = new DashboardService();
