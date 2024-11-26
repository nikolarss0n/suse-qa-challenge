/**
 * Service class managing dashboard operations and verifications.
 */
import { DashboardPage } from "@/pages/dashboard.page";

export class DashboardService {
	/**
	 * Dashboard page instance for handling UI interactions.
	 * @private
	 */
	private dashboardPage: DashboardPage;

	/**
	 * Initializes a new instance of DashboardService.
	 */
	constructor() {
		this.dashboardPage = new DashboardPage();
	}

	/**
	 * Verifies that the dashboard has loaded with all required elements.
	 * @throws {Error} If any required dashboard elements are missing or not visible
	 */
	verifyDashboardLoaded(): void {
		this.dashboardPage.verifyDashboardLoaded();
	}

	/**
	 * Verifies that the dashboard banner has loaded correctly.
	 * @throws {Error} If banner element is missing or not visible
	 */
	verifyBannerLoaded(): void {
		this.dashboardPage.verifyBannerLoaded();
	}

	/**
	 * Verifies the page title matches expected value.
	 * @param expectedTitle - Title text to verify
	 * @throws {Error} If page title doesn't match expected value
	 */
	verifyPageTitle(expectedTitle: string): void {
		cy.title().should('eq', expectedTitle);
	}

	/**
	 * Verifies displayed username in user menu.
	 * @param expectedUsername - Username to verify
	 * @throws {Error} If username is not visible or doesn't match expected value
	 */
	verifyUsername(expectedUsername: string): void {
		this.dashboardPage.clickUserName();
		this.dashboardPage.getElement('userMenuUsername')
			.should('be.visible')
			.and('contain.text', expectedUsername);
	}
}

export const dashboardService = new DashboardService();