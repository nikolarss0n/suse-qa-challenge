/**
 * Represents login credentials for authentication.
 */
export interface LoginData {
	username: string;
	password: string;
}

/**
 * Defines the complete test data structure for authentication and dashboard testing.
 */
export interface TestData {
	/**
	 * Login credentials for authentication tests.
	 */
	login: LoginData;

	/**
	 * Expected page title for verification.
	 */
	expectedTitle: string;

	/**
	 * Collection of error messages for validation testing.
	 */
	errorMessages: {
		/** Message displayed for invalid credentials */
		invalidCredentials: string;
		/** Message displayed for empty required fields */
		emptyFields: string;
	};

	/**
	 * Dashboard UI element content for verification.
	 */
	dashboardElements: {
		/** Expected dashboard title text */
		title: string;
		/** Expected welcome message content */
		welcomeMessage: string;
		/** List of expected menu item texts */
		menuItems: string[];
	};
}