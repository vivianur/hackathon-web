import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import type { ReactNode } from 'react';
import { useAccessibilityStore } from '../store/accessibilityStore';
import { useThemeStore } from '../store/themeStore';

interface AccessibleContainerProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
  disableFocusBlur?: boolean;
}

export default function AccessibleContainer({ children, sx, disableFocusBlur = false }: AccessibleContainerProps) {
  const { fontSize, spacing, contrastLevel, focusMode } = useAccessibilityStore();
  const mode = useThemeStore((state) => state.mode);

  const getFontSizeMultiplier = () => {
    switch (fontSize) {
      case 'small': return 0.875;
      case 'medium': return 1;
      case 'large': return 1.125;
      case 'extra-large': return 1.25;
      default: return 1;
    }
  };

  const getSpacingMultiplier = () => {
    switch (spacing) {
      case 'compact': return 1;
      case 'comfortable': return 1.5;
      case 'spacious': return 2;
      default: return 1.5;
    }
  };

  const getContrastStyles = () => {
    // Modo claro
    if (mode === 'light') {
      switch (contrastLevel) {
        case 'low':
          return { filter: 'contrast(0.9)' };
        case 'medium':
          return { filter: 'contrast(1.2)' };
        default:
          return {};
      }
    }

    // Modo escuro
    switch (contrastLevel) {
      case 'low':
        return { filter: 'contrast(1.2)' };
      case 'medium':
        return { filter: 'contrast(0.8)' };
      default:
        return {};
    }
  };

  return (
    <Box
      sx={{
        fontSize: `${getFontSizeMultiplier()}rem`,
        '& > *': {
          paddingBottom: `${getSpacingMultiplier()}rem`,
        },
        ...getContrastStyles(),
        ...(focusMode && !disableFocusBlur ? {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(2px)',
            pointerEvents: 'none',
            zIndex: -1,
          }
        } : {}),
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
