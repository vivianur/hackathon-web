import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import type { SystemStyleObject } from '@mui/system';
import type { ReactNode } from 'react';
import { useAnimations } from '../hooks/useAnimations';

interface AnimatedWrapperProps {
  children: ReactNode;
  type?: 'page' | 'section' | 'card';
  delay?: number;
  sx?: SxProps<Theme>;
}

/**
 * Generic animated wrapper that applies contextual animations
 * based on complexity level and animation settings.
 */
export default function AnimatedWrapper({
  children,
  type = 'section',
  delay = 0,
  sx
}: AnimatedWrapperProps) {
  const animations = useAnimations();

  const getAnimationStyle = (): SystemStyleObject<Theme> | undefined => {
    if (!animations.shouldAnimate) return undefined;

    switch (type) {
      case 'page':
        return animations.fadeIn;
      case 'section':
        return animations.slideUp;
      case 'card':
        return {
          ...animations.slideUp,
          ...(delay > 0 && {
            animationDelay: `${delay}ms`,
          }),
        };
      default:
        return undefined;
    }
  };

  const style = getAnimationStyle();

  return (
    <Box sx={{ ...(style ?? {}), ...sx }}>
      {children}
    </Box>
  );
}
