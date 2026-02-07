import { createSingletonStore } from "./createSingletonStore";

interface ThemeStore {
	mode: "light" | "dark";
	toggleTheme: () => void;
	resetToDefault: () => void;
}

export const useThemeStore = createSingletonStore<ThemeStore>(
	(set, get) => ({
		mode: "light",
		toggleTheme: () => {
			const newMode = get().mode === "light" ? "dark" : "light";
			set({ mode: newMode });
		},
		resetToDefault: () => {
			set({ mode: "light" });
		},
	}),
	{
		name: "theme-storage",
	},
);
