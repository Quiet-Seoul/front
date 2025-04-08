import React from "react";
import { Text, StyleSheet } from "react-native";
import type { StyleProp, TextStyle } from "react-native";

interface Props {
	style?: StyleProp<TextStyle>;
	children: React.ReactNode;
}

export function Heading1({ children, style }: Props) {
	return <Text style={[styles.h1, style]}>{children}</Text>;
}

export function Heading2({ children, style }: Props) {
	return <Text style={[styles.h2, style]}>{children}</Text>;
}

export function Heading3({ children, style }: Props) {
	return <Text style={[styles.h3, style]}>{children}</Text>;
}

export function Heading4({ children, style }: Props) {
	return <Text style={[styles.h4, style]}>{children}</Text>;
}

export function Body1({ children, style }: Props) {
	return <Text style={[styles.b1, style]}>{children}</Text>;
}

export function Body2({ children, style }: Props) {
	return <Text style={[styles.b2, style]}>{children}</Text>;
}

export function Body3({ children, style }: Props) {
	return <Text style={[styles.b3, style]}>{children}</Text>;
}

export function Body3C({ children, style }: Props) {
	return <Text style={[styles.b3c, style]}>{children}</Text>;
}

export function Body4({ children, style }: Props) {
	return <Text style={[styles.b4, style]}>{children}</Text>;
}

export function Body5({ children, style }: Props) {
	return <Text style={[styles.b5, style]}>{children}</Text>;
}

export function Caption1({ children, style }: Props) {
	return <Text style={[styles.c1, style]}>{children}</Text>;
}

export function Caption2({ children, style }: Props) {
	return <Text style={[styles.c2, style]}>{children}</Text>;
}

export function Caption3({ children, style }: Props) {
	return <Text style={[styles.c3, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
	h1: {
		fontSize: 20,
		lineHeight: 24,
		fontWeight: 600,
		fontFamily: "Pretendard",
	},
	h2: {
		fontSize: 17,
		lineHeight: 24,
		fontWeight: 600,
		fontFamily: "Pretendard",
	},
	h3: {
		fontSize: 16,
		lineHeight: 20,
		fontWeight: 600,
		fontFamily: "Pretendard",
	},
	h4: {
		fontSize: 15,
		lineHeight: 20,
		fontWeight: 600,
		fontFamily: "Pretendard",
	},
	b1: {
		fontSize: 15,
		lineHeight: 20,
		fontWeight: 500,
		fontFamily: "Pretendard",
	},
	b2: {
		fontSize: 14,
		lineHeight: 20,
		fontWeight: 500,
		fontFamily: "Pretendard",
	},
	b3: {
		fontSize: 14,
		lineHeight: 20,
		fontWeight: 400,
		fontFamily: "Pretendard",
	},
	b3c: {
		fontSize: 14,
		lineHeight: 18,
		fontWeight: 400,
		fontFamily: "Pretendard",
	},
	b4: {
		fontSize: 13,
		lineHeight: 16,
		fontWeight: 500,
		fontFamily: "Pretendard",
	},
	b5: {
		fontSize: 13,
		lineHeight: 16,
		fontWeight: 400,
		fontFamily: "Pretendard",
	},
	c1: {
		fontSize: 12,
		lineHeight: 16,
		fontWeight: 500,
		fontFamily: "Pretendard",
	},
	c2: {
		fontSize: 12,
		lineHeight: 16,
		fontWeight: 400,
		fontFamily: "Pretendard",
	},
	c3: {
		fontSize: 11,
		lineHeight: 14,
		fontWeight: 500,
		fontFamily: "Pretendard",
	},
});
