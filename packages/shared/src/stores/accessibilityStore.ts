import type { AccessibilitySettings } from "../domain/entities/AccessibilitySettings";
import { createSingletonStore } from "./createSingletonStore";

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

export const useAccessibilityStore = createSingletonStore<AccessibilityStore>(
	(set, get) => ({
		...defaultSettings,
		setComplexityLevel: (level) => {
			set({ complexityLevel: level });
		},
		toggleFocusMode: () => {
			set({ focusMode: !get().focusMode });
		},
		toggleDetailedMode: () => {
			set({ detailedMode: !get().detailedMode });
		},
		setContrastLevel: (level) => {
			set({ contrastLevel: level });
		},
		setFontSize: (size) => {
			set({ fontSize: size });
		},
		setSpacing: (spacing) => {
			set({ spacing: spacing });
		},
		toggleAnimations: () => {
			set({ animationsEnabled: !get().animationsEnabled });
		},
		toggleCognitiveAlerts: () => {
			set({ cognitiveAlerts: !get().cognitiveAlerts });
		},
		toggleVlibras: () => {
			set({ vlibrasEnabled: !get().vlibrasEnabled });
		},
		resetToDefaults: () => {
			set(defaultSettings);
		},
	}),
	{
		name: "accessibility-storage",
	},
);
