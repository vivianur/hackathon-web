import { Alert, Snackbar, Box, Typography, Button } from '@mui/material';
import { Info, EmojiEvents, Warning } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useAccessibilityStore } from '../store/accessibilityStore';
import { usePomodoroStore } from '../store/pomodoroStore';
import { useThemeStore } from '../store/themeStore';

export default function CognitiveAlerts() {
  const { cognitiveAlerts, detailedMode } = useAccessibilityStore();
  const { isActive, currentPhase, sessionCount } = usePomodoroStore();
  const mode = useThemeStore((state) => state.mode);
  const [alert, setAlert] = useState<{ type: 'info' | 'warning' | 'success', message: string } | null>(null);

  useEffect(() => {
    if (!cognitiveAlerts) return;

    // Alerta de tempo prolongado em uma tarefa
    const checkLongSession = setTimeout(() => {
      if (isActive && currentPhase === 'focus') {
        setAlert({
          type: 'warning',
          message: 'Você está focado há um tempo. Que tal fazer uma pausa?'
        });
      }
    }, 45 * 60 * 1000); // 45 minutos

    // Mensagens de incentivo
    if (sessionCount > 0 && sessionCount % 4 === 0) {
      setAlert({
        type: 'success',
        message: `Parabéns! Você completou ${sessionCount} sessões de foco! 🎉`
      });
    }

    return () => clearTimeout(checkLongSession);
  }, [cognitiveAlerts, isActive, currentPhase, sessionCount]);

  const handleClose = () => {
    setAlert(null);
  };

  if (!cognitiveAlerts || !alert) return null;

  const getIcon = () => {
    switch (alert.type) {
      case 'success': return <EmojiEvents />;
      case 'warning': return <Warning />;
      default: return <Info />;
    }
  };

  return (
    <Snackbar
      open={!!alert}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity={alert.type}
        icon={getIcon()}
        sx={{ 
          width: '100%', 
          fontSize: '1.1rem',
          ...(detailedMode && {
            bgcolor: mode === 'light' ? '#e0e0e0' : '#424242',
            color: 'text.primary',
            '& .MuiAlert-icon': {
              color: mode === 'light' ? '#555555' : '#aaaaaa',
            },
          }),
        }}
        action={
          <Button color="inherit" size="small" onClick={handleClose}>
            OK
          </Button>
        }
      >
        <Box>
          <Typography variant="body1" fontWeight="medium">
            {alert.message}
          </Typography>
        </Box>
      </Alert>
    </Snackbar>
  );
}
