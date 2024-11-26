/**
 * Page object representing the main dashboard interface.
 * Provides methods for interacting with and verifying dashboard elements.
 */
import { BasePage } from "@/pages/base.page";

export class DashboardPage extends BasePage {
	/**
	 * Map of element identifiers to their corresponding test IDs and selectors.
	 * @protected
	 */
	protected selectors = {
		mainContent: '[data-testid="home-banner-graphic"]',
		navigationMenu: '[data-testid="side-menu"]',
		userName: '[data-testid="nav_header_showUserMenu"]',
		userMenuUsername: '.user-name',
		banner: '[data-testid="banner-title"]'
	};

	/**
	 * Verifies that critical dashboard elements are loaded and visible.
	 * @throws {Error} If any required element is not visible or present
	 */
	verifyDashboardLoaded(): void {
		this.getElement('mainContent').should('be.visible');
		this.getElement('navigationMenu').should('exist');
		this.getElement('userName').should('be.visible');
	}

	/**
	 * Verifies that the banner element is present and visible.
	 * @throws {Error} If banner element is not visible or present
	 */
	verifyBannerLoaded(): void {
		this.getElement('banner').should('exist');
		this.getElement('banner').should('be.visible');
	}

	/**
	 * Clicks on the user name element to open the user menu.
	 * @throws {Error} If userName element is not clickable
	 */
	clickUserName(): void {
		this.getElement('userName').click();
	}
}