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
	baseUrl: process.env.CYPRESS_BASE_URL || 'https://localhost:8443',
	env: {
		RANCHER_URL: 'https://localhost:8443'
	}
} as const;