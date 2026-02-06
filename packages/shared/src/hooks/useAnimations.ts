import { useAccessibilityStore } from "../stores/accessibilityStore";
import { keyframes } from "@emotion/react";
import type { Theme } from "@mui/material/styles";
import type { SystemStyleObject } from "@mui/system";

export type AnimationLevel = "none" | "moderate" | "detailed";

interface AnimationConfig {
	level: AnimationLevel;
	shouldAnimate: boolean;
	fadeIn: SystemStyleObject<Theme>;
	slideUp: SystemStyleObject<Theme>;
	slideDown: SystemStyleObject<Theme>;
	scaleOnHover: SystemStyleObject<Theme>;
	glowEffect: SystemStyleObject<Theme>;
	cardHover: SystemStyleObject<Theme>;
	staggerDelay: (index: number) => SystemStyleObject<Theme>;
}

const fadeInKf = keyframes`
	from { opacity: 0; }
	to { opacity: 1; }
`;

const slideUpKf = keyframes`
	from { opacity: 0; transform: translateY(20px); }
	to { opacity: 1; transform: translateY(0); }
`;

const slideDownKf = keyframes`
	from { opacity: 0; transform: translateY(-10px); }
	to { opacity: 1; transform: translateY(0); }
`;

const fadeInStaggerKf = keyframes`
	from { opacity: 0; transform: translateX(-20px); }
	to { opacity: 1; transform: translateX(0); }
`;

export function useAnimations(): AnimationConfig {
	const { focusMode, complexityLevel, animationsEnabled } =
		useAccessibilityStore();

	// Determine animation level based on complexity and settings
	const getAnimationLevel = (): AnimationLevel => {
		if (!animationsEnabled || focusMode || complexityLevel === "simple") {
			return "none";
		}
		return complexityLevel === "detailed" ? "detailed" : "moderate";
	};

	const level = getAnimationLevel();
	const shouldAnimate = level !== "none";

	// Base animations for moderate mode
	const fadeIn: SystemStyleObject<Theme> = shouldAnimate
		? {
				animation: `${fadeInKf} 0.4s ease-in-out`,
			}
		: {};

	const slideUp: SystemStyleObject<Theme> = shouldAnimate
		? {
				animation: `${slideUpKf} 0.5s ease-out`,
			}
		: {};

	const slideDown: SystemStyleObject<Theme> = shouldAnimate
		? {
				animation: `${slideDownKf} 0.3s ease-out`,
			}
		: {};

	// Hover effects - only in detailed mode
	const scaleOnHover: SystemStyleObject<Theme> =
		level === "detailed"
			? {
					transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
					"&:hover": {
						transform: "scale(1.02)",
						boxShadow: 6,
					},
				}
			: {};

	const glowEffect: SystemStyleObject<Theme> =
		level === "detailed"
			? {
					transition: "all 0.3s ease",
					"&:hover": {
						boxShadow: "0 0 20px rgba(255, 121, 198, 0.4)",
						borderColor: "primary.main",
					},
				}
			: {};

	const cardHover: SystemStyleObject<Theme> = shouldAnimate
		? {
				transition: "all 0.3s ease",
				"&:hover": {
					boxShadow: level === "detailed" ? 6 : 3,
					transform: level === "detailed" ? "translateY(-4px)" : "none",
				},
			}
		: {};

	// Stagger animation for lists - detailed mode only
	const staggerDelay = (index: number): SystemStyleObject<Theme> => {
		if (level === "detailed") {
			return {
				animation: `${fadeInStaggerKf} 0.5s ease-out ${index * 0.1}s both`,
			};
		}
		return level === "moderate" ? fadeIn : {};
	};

	return {
		level,
		shouldAnimate,
		fadeIn,
		slideUp,
		slideDown,
		scaleOnHover,
		glowEffect,
		cardHover,
		staggerDelay,
	};
}
