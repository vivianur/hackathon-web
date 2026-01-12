import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import type { ReactNode } from 'react';
import { useAccessibilityStore } from '../store/accessibilityStore';

interface AccessibleContainerProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
  disableFocusBlur?: boolean;
}

export default function AccessibleContainer({ children, sx, disableFocusBlur = false }: AccessibleContainerProps) {
  const { fontSize, spacing, contrastLevel, focusMode } = useAccessibilityStore();

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
    switch (contrastLevel) {
      case 'low':
        return { filter: 'contrast(0.9)' };
      case 'medium':
        return {};
      case 'high':
        return { filter: 'contrast(1.2)', fontWeight: 500 };
      default:
        return {};
    }
  };

  return (
    <Box
      sx={{
        fontSize: `${getFontSizeMultiplier()}rem`,
        '& > *': {
          marginBottom: `${getSpacingMultiplier()}rem`,
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
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
