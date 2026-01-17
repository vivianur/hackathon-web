import { useSpacingMultiplier } from '../context/SpacingContext';

export function useSpacing() {
  const multiplier = useSpacingMultiplier();
  
  return {
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
}
