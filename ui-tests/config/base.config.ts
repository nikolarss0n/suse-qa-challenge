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
	baseUrl: 'https://localhost',
	env: {
		RANCHER_URL: 'https://localhost'
	}
} as const;