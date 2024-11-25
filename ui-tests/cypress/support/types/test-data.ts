export interface LoginData {
	username: string;
	password: string;
}

export interface TestData {
	login: LoginData;
	expectedTitle: string;
	errorMessages: {
		invalidCredentials: string;
		emptyFields: string;
	};
	dashboardElements: {
		title: string;
		welcomeMessage: string;
		menuItems: string[];
	};
}
