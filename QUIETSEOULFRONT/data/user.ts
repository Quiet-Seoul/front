import { LoginData, SignUpData } from "@/types/user";

const domain = "http://54.180.114.193:8080";

export const fetchCreateUser = async (data: SignUpData) => {
	const response = await fetch(domain + "/api/users/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (response.status !== 200) {
		throw new Error("Failed to create user");
	}

	const result = await response.json();

	return result;
};

export const fetchUserLogin = async (data: LoginData) => {
	const response = await fetch(domain + "/api/users/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (response.status !== 200) {
		throw new Error("Failed to login user");
	}

	const result = await response.json();

	return result;
};

export const fetchUserData = async (token: string) => {
	const response = await fetch(domain + "/api/users/me", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	if (response.status !== 200) {
		throw new Error("Failed to fetch user data");
	}

	const result = await response.json();

	return result;
};
