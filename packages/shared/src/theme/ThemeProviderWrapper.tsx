import { ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import { useThemeStore } from "../stores/themeStore";
import { useAccessibilityStore } from "../stores/accessibilityStore";

export default function ThemeProviderWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const mode = useThemeStore((state) => state.mode);
	const fontSize = useAccessibilityStore((state) => state.fontSize);
	const detailedMode = useAccessibilityStore((state) => state.detailedMode);

	const getFontSizeMultiplier = () => {
		switch (fontSize) {
			case "small":
				return 0.875;
			case "medium":
				return 1;
			case "large":
				return 1.125;
			case "extra-large":
				return 1.25;
			default:
				return 1;
		}
	};

	const fontSizeMultiplier = getFontSizeMultiplier();

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
					primary: {
						main: detailedMode
							? mode === "light"
								? "#333333"
								: "#cccccc"
							: mode === "light"
								? "#be0078cc"
								: "#ff00d0",
					},
					secondary: {
						main: detailedMode
							? mode === "light"
								? "#666666"
								: "#999999"
							: mode === "light"
								? "#dc004e"
								: "#ff00d0",
					},
					error: {
						main: detailedMode
							? mode === "light"
								? "#444444"
								: "#aaaaaa"
							: mode === "light"
								? "#d32f2f"
								: "#f44336",
					},
					warning: {
						main: detailedMode
							? mode === "light"
								? "#555555"
								: "#999999"
							: mode === "light"
								? "#f57c00"
								: "#ff9800",
					},
					info: {
						main: detailedMode
							? mode === "light"
								? "#666666"
								: "#888888"
							: mode === "light"
								? "#1976d2"
								: "#2196f3",
					},
					success: {
						main: detailedMode
							? mode === "light"
								? "#333333"
								: "#aaaaaa"
							: mode === "light"
								? "#388e3c"
								: "#4caf50",
					},
					background: {
						default: mode === "light" ? "#f5f5f5" : "#121212",
						paper: mode === "light" ? "#ffffff" : "#1e1e1e",
					},
				},
				typography: {
					fontSize: 14 * fontSizeMultiplier,
					h1: { fontSize: `${2 * fontSizeMultiplier}rem` },
					h2: { fontSize: `${1.75 * fontSizeMultiplier}rem` },
					h3: { fontSize: `${1.5 * fontSizeMultiplier}rem` },
					h4: { fontSize: `${1.3 * fontSizeMultiplier}rem` },
					h5: { fontSize: `${1.15 * fontSizeMultiplier}rem` },
					h6: { fontSize: `${1 * fontSizeMultiplier}rem` },
					body1: { fontSize: `${1 * fontSizeMultiplier}rem` },
					body2: { fontSize: `${0.875 * fontSizeMultiplier}rem` },
					button: { fontSize: `${0.875 * fontSizeMultiplier}rem` },
					caption: { fontSize: `${0.75 * fontSizeMultiplier}rem` },
				},
				components: {
					MuiAppBar: {
						styleOverrides: {
							root: {
								backgroundColor: detailedMode
									? mode === "light"
										? "#333333"
										: "#1e1e1e"
									: mode === "light"
										? "#be0079"
										: "#1e1e1e",
								color: detailedMode
									? mode === "light"
										? "#ffffff"
										: "#cccccc"
									: mode === "light"
										? "#ffffff"
										: "#ff00d0",
							},
						},
					},
					MuiSwitch: {
						styleOverrides: {
							root: {
								"&:not(.Mui-checked) .MuiSwitch-thumb": {
									boxShadow:
										mode === "light" ? "0 2px 8px rgba(0, 0, 0, 0.5)" : "none",
								},
							},
						},
					},
				},
			}),
		[mode, fontSizeMultiplier, detailedMode],
	);

	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
