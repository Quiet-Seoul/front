import { LoginData, SignUpData } from "@/types/user";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL;

export const fetchCreateUser = async (data: SignUpData) => {
	const response = await fetch(
		API_URL + "/api/users/register",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}
	);

	if (response.status !== 200) {
		throw new Error("Failed to create user");
	}

	const result = await response.json();
	return result;
};

export const fetchUserLogin = async (data: LoginData) => {
	console.log("🌐 로그인 요청 주소:", API_URL + "/api/users/login");

	const response = await fetch(API_URL + "/api/users/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (response.status !== 200) {
		const text = await response.text();
		console.error("❌ 로그인 실패 응답:", text); // 추가 디버깅
		throw new Error("Failed to login user");
	}

	const result = await response.json();
	return result;
};

export const fetchUserData = async (token: string) => {
	const response = await fetch(API_URL + "/api/users/me", {
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
