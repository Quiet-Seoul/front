export interface SignUpData {
	username: string;
	password: string;
	name: string;
	phone: string;
	birthdate: string;
	gender: string;
}

export interface SignUpValidationData extends SignUpData {
	checkPassword: string;
}

export interface LoginData {
	username: string;
	password: string;
}

export interface UserData {
	id: string;
	username: string;
	name: string;
	phone: string;
	birthdate: string;
	gender: string;
}
