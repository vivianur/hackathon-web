import { useAccessibilityStore } from '../stores/accessibilityStore';
import type { Theme } from '@mui/material/styles';
import type { SystemStyleObject } from '@mui/system';

export type AnimationLevel = 'none' | 'moderate' | 'detailed';

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

export function useAnimations(): AnimationConfig {
  const { focusMode, complexityLevel, animationsEnabled } = useAccessibilityStore();

  // Determine animation level based on complexity and settings
  const getAnimationLevel = (): AnimationLevel => {
    if (!animationsEnabled || focusMode || complexityLevel === 'simple') {
      return 'none';
    }
    return complexityLevel === 'detailed' ? 'detailed' : 'moderate';
  };

  const level = getAnimationLevel();
  const shouldAnimate = level !== 'none';

  // Base animations for moderate mode
  const fadeIn: SystemStyleObject<Theme> = shouldAnimate ? {
    animation: 'fadeIn 0.4s ease-in-out',
    '@keyframes fadeIn': {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
  } : {};

  const slideUp: SystemStyleObject<Theme> = shouldAnimate ? {
    animation: 'slideUp 0.5s ease-out',
    '@keyframes slideUp': {
      from: {
        opacity: 0,
        transform: 'translateY(20px)',
      },
      to: {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
  } : {};

  const slideDown: SystemStyleObject<Theme> = shouldAnimate ? {
    animation: 'slideDown 0.3s ease-out',
    '@keyframes slideDown': {
      from: {
        opacity: 0,
        transform: 'translateY(-10px)',
      },
      to: {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
  } : {};

  // Hover effects - only in detailed mode
  const scaleOnHover: SystemStyleObject<Theme> = level === 'detailed' ? {
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: 6,
    },
  } : {};

  const glowEffect: SystemStyleObject<Theme> = level === 'detailed' ? {
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 0 20px rgba(255, 121, 198, 0.4)',
      borderColor: 'primary.main',
    },
  } : {};

  const cardHover: SystemStyleObject<Theme> = shouldAnimate ? {
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: level === 'detailed' ? 6 : 3,
      transform: level === 'detailed' ? 'translateY(-4px)' : 'none',
    },
  } : {};

  // Stagger animation for lists - detailed mode only
  const staggerDelay = (index: number): SystemStyleObject<Theme> => {
    if (level === 'detailed') {
      return {
        animation: `fadeInStagger 0.5s ease-out ${index * 0.1}s both`,
        '@keyframes fadeInStagger': {
          from: {
            opacity: 0,
            transform: 'translateX(-20px)',
          },
          to: {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
      };
    }
    return level === 'moderate' ? fadeIn : {};
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
