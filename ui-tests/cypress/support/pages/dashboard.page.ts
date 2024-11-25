import { BasePage } from "@/pages/base.page";

export class DashboardPage extends BasePage {
	readonly elements = {
		mainContent: () => cy.get('[data-testid="home-banner-graphic"]'),
		navigationMenu: () => cy.get('[data-testid="side-menu"]'),
		userName: () => cy.get('[data-testid="nav_header_showUserMenu"]')
	};

	verifyDashboardLoaded(): void {
		this.elements.mainContent().should('be.visible');
		this.elements.navigationMenu().should('exist');
		this.elements.userName().should('be.visible');
	}
}