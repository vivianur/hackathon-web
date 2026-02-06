import { create } from "zustand";
import { persist } from "zustand/middleware";
import { enableStoreSync } from "./syncStores";

interface ThemeStore {
	mode: "light" | "dark";
	toggleTheme: () => void;
	resetToDefault: () => void;
}

export const useThemeStore = create<ThemeStore>()(
	persist(
		(set) => ({
			mode: "light",
			toggleTheme: () =>
				set((state) => ({
					mode: state.mode === "light" ? "dark" : "light",
				})),
			resetToDefault: () => set({ mode: "light" }),
		}),
		{
			name: "theme-storage",
		},
	),
);

enableStoreSync(useThemeStore, "theme-storage");
