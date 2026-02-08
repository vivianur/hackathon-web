import { useAccessibilityStore } from '../stores/accessibilityStore';

interface SpacingConfig {
  multiplier: number;
  gridSpacing: number;
  gap: string;
  mb: string;
  mt: string;
  p: string;
  px: string;
  py: string;
}

export function useSpacing(): SpacingConfig {
  const spacing = useAccessibilityStore((state) => state.spacing);

  // Derive multiplier from spacing level
  const getMultiplier = (): number => {
    switch (spacing) {
      case 'compact':
        return 0.5;
      case 'spacious':
        return 2;
      case 'comfortable':
      default:
        return 1;
    }
  };

  const multiplier = getMultiplier();

  const result = {
    multiplier,
    // Grid spacing (MUI usa 8px como base)
    gridSpacing: Math.round(3 * multiplier),

    // Margins e paddings em rem
    gap: `${1 * multiplier}rem`,
    mb: `${1 * multiplier}rem`,
    mt: `${1 * multiplier}rem`,
    p: `${1 * multiplier}rem`,
    px: `${1.5 * multiplier}rem`,
    py: `${1 * multiplier}rem`,
  };

  return result;
}
