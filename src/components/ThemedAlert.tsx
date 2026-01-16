import { Alert, type AlertProps } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { useThemeStore } from '../store/themeStore';
import { useAccessibilityStore } from '../store/accessibilityStore';

interface ThemedAlertProps extends AlertProps {
  sx?: SxProps<Theme>;
}

export default function ThemedAlert({ sx, children, ...props }: ThemedAlertProps) {
  const mode = useThemeStore((state) => state.mode);
  const detailedMode = useAccessibilityStore((state) => state.detailedMode);

  const baseSx: SxProps<Theme> = {
    bgcolor: detailedMode
      ? (mode === 'light' ? 'rgba(150, 150, 150, 0.31)' : 'rgba(120, 120, 120, 0.31)')
      : 'rgba(255, 121, 197, 0.31)',
    color: 'text.primary',
    '& .MuiAlert-icon': { 
      color: detailedMode
        ? (mode === 'light' ? '#555555' : '#aaaaaa')
        : (mode === 'light' ? '#be0078cc' : '#ff00d0')
    },
  };

  return (
    <Alert {...props} sx={{ ...baseSx, ...sx }}>
      {children}
    </Alert>
  );
}
