export const BaseConfig = {
	apiPath: '/v3',
	routes: {
		login: '/',
		dashboard: '/dashboard'
	},
	timeouts: {
		defaultTimeout: 10000,
		pageLoad: 30000
	},
	get baseUrl() {
		return typeof Cypress !== 'undefined'
			? Cypress.env('BASE_URL')
			: 'https://localhost:8443';
	},
	get env() {
		return {
			RANCHER_URL: typeof Cypress !== 'undefined'
				? Cypress.env('RANCHER_URL')
				: 'https://localhost:8443'
		};
	}
} as const;

export type BaseConfigType = typeof BaseConfig;