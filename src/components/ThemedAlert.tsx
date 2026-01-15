import { Alert, type AlertProps } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { useThemeStore } from '../store/themeStore';

interface ThemedAlertProps extends AlertProps {
  sx?: SxProps<Theme>;
}

export default function ThemedAlert({ sx, children, ...props }: ThemedAlertProps) {
  const mode = useThemeStore((state) => state.mode);

  const baseSx: SxProps<Theme> = {
    bgcolor: 'rgba(255, 121, 197, 0.31)',
    color: 'text.primary',
    '& .MuiAlert-icon': { color: mode === 'light' ? '#be0078cc' : '#ff00d0' },
  };

  return (
    <Alert {...props} sx={{ ...baseSx, ...sx }}>
      {children}
    </Alert>
  );
}
