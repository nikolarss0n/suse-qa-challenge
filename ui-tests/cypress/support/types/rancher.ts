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

export interface LoginResponse {
	token: string;
	user: {
		id: string;
		username: string;
		name: string;
	};
	responseType?: string;
	status?: number;
	message?: string;
}

export interface ApiError {
	status: number;
	message: string;
	detail?: string;
}

export interface RancherUser {
	name: string;
	id: string;
	username: string;
}