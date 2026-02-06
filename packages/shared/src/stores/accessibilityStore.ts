import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AccessibilitySettings } from "../domain/entities/AccessibilitySettings";
import { enableStoreSync } from "./syncStores";

interface AccessibilityStore extends AccessibilitySettings {
	setComplexityLevel: (level: AccessibilitySettings["complexityLevel"]) => void;
	toggleFocusMode: () => void;
	toggleDetailedMode: () => void;
	setContrastLevel: (level: AccessibilitySettings["contrastLevel"]) => void;
	setFontSize: (size: AccessibilitySettings["fontSize"]) => void;
	setSpacing: (spacing: AccessibilitySettings["spacing"]) => void;
	toggleAnimations: () => void;
	toggleCognitiveAlerts: () => void;
	toggleVlibras: () => void;
	resetToDefaults: () => void;
}

const defaultSettings: AccessibilitySettings = {
	complexityLevel: "moderate",
	focusMode: false,
	detailedMode: false,
	contrastLevel: "medium",
	fontSize: "medium",
	spacing: "comfortable",
	animationsEnabled: true,
	cognitiveAlerts: true,
	vlibrasEnabled: false,
};

export const useAccessibilityStore = create<AccessibilityStore>()(
	persist(
		(set) => ({
			...defaultSettings,
			setComplexityLevel: (level) => set({ complexityLevel: level }),
			toggleFocusMode: () => set((state) => ({ focusMode: !state.focusMode })),
			toggleDetailedMode: () =>
				set((state) => ({ detailedMode: !state.detailedMode })),
			setContrastLevel: (level) => set({ contrastLevel: level }),
			setFontSize: (size) => set({ fontSize: size }),
			setSpacing: (spacing) => set({ spacing: spacing }),
			toggleAnimations: () =>
				set((state) => ({ animationsEnabled: !state.animationsEnabled })),
			toggleCognitiveAlerts: () =>
				set((state) => ({ cognitiveAlerts: !state.cognitiveAlerts })),
			toggleVlibras: () =>
				set((state) => ({ vlibrasEnabled: !state.vlibrasEnabled })),
			resetToDefaults: () => set(defaultSettings),
		}),
		{
			name: "accessibility-storage",
		},
	),
);

enableStoreSync(useAccessibilityStore, "accessibility-storage");
