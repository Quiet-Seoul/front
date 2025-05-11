import { LoginData, SignUpData } from "@/types/user";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL;

export const fetchCreateUser = async (data: SignUpData) => {
	const response = await fetch(API_URL + "/api/users/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		// 백엔드 응답 본문을 로그로 출력
		const errorResponse = await response.json().catch(() => null);
		console.error("❌ 회원가입 실패 응답:", errorResponse);
		throw new Error(errorResponse?.message || "회원가입 실패");
	}

	const result = await response.json();
	return result;
};


export const fetchUserLogin = async (data: LoginData) => {
	const response = await fetch(API_URL + "/api/users/login", {
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
