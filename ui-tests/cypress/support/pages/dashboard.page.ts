import { BasePage } from "@/pages/base.page";

export class DashboardPage extends BasePage {
	readonly elements = {
		mainContent: () => cy.get('[data-testid="dashboard-content"]'),
		navigationMenu: () => cy.get('[data-testid="nav-menu"]'),
		clusterList: () => cy.get('[data-testid="cluster-list"]'),
		userName: () => cy.get('[data-testid="user-menu"]')
	};

	verifyDashboardLoaded(): void {
		this.elements.mainContent().should('be.visible');
		this.elements.navigationMenu().should('exist');
		this.elements.clusterList().should('be.visible');
		this.elements.userName().should('be.visible');
	}
}