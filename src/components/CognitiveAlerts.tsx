import { Alert, Snackbar, Box, Typography, Button } from '@mui/material';
import { Info, EmojiEvents, Warning } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { useAccessibilityStore } from '../store/accessibilityStore';
import { usePomodoroStore } from '../store/pomodoroStore';
import { useThemeStore } from '../store/themeStore';

export default function CognitiveAlerts() {
  const { cognitiveAlerts, detailedMode } = useAccessibilityStore();
  const { isActive, currentPhase, sessionCount, timeRemaining } = usePomodoroStore();
  const mode = useThemeStore((state) => state.mode);

  const [alert, setAlert] = useState<{
    type: 'info' | 'warning' | 'success';
    message: string;
  } | null>(null);

  // 🆕 controles de tempo
  const focusStartRef = useRef<number | null>(null);
  const firstAlertShownRef = useRef(false);
  const secondAlertTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longSessionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstAlertTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastCelebratedSessionRef = useRef<number | null>(null);


  useEffect(() => {
    if (!cognitiveAlerts) return;

    // reset ao parar foco
    if (!isActive || currentPhase !== 'focus') {
      focusStartRef.current = null;
      firstAlertShownRef.current = false;

      if (firstAlertTimeoutRef.current) clearTimeout(firstAlertTimeoutRef.current);
      if (secondAlertTimeoutRef.current) clearTimeout(secondAlertTimeoutRef.current);
      if (longSessionTimeoutRef.current) clearTimeout(longSessionTimeoutRef.current);

      firstAlertTimeoutRef.current = null;
      secondAlertTimeoutRef.current = null;
      longSessionTimeoutRef.current = null;

      return;
    }

    // início do foco
    if (!focusStartRef.current) {
      focusStartRef.current = Date.now();
      firstAlertShownRef.current = false;

      const estimatedMinutes = Math.round(timeRemaining / 60) || 25;

      // ⏱ alerta no tempo estimado
      firstAlertTimeoutRef.current = setTimeout(() => {
        if (!firstAlertShownRef.current) {
          firstAlertShownRef.current = true;
          setAlert({
            type: 'warning',
            message: 'Você atingiu o tempo estimado dessa tarefa. Que tal uma pausa gentil?',
          });
        }
      }, estimatedMinutes * 60 * 1000);

      // ⏱ alerta de sessão muito longa (30)
      longSessionTimeoutRef.current = setTimeout(() => {
        setAlert({
          type: 'warning',
          message: 'Você está focado há bastante tempo. Uma pausa pode ajudar 🌿',
        });
      }, 30 * 60 * 1000);
    }

    // 🎉 incentivo por sessões
    if (
      sessionCount > 0 &&
      sessionCount % 4 === 0 &&
      lastCelebratedSessionRef.current !== sessionCount
    ) {
      lastCelebratedSessionRef.current = sessionCount;

      setAlert({
        type: 'success',
        message: `Parabéns! Você completou ${sessionCount} sessões de foco! 🎉`,
      });
    }


    return () => { };
  }, [cognitiveAlerts, isActive, currentPhase, sessionCount, timeRemaining]);

  const handleClose = () => {
    setAlert(null);

    // segundo alerta se continuar focado
    if (
      isActive &&
      currentPhase === 'focus' &&
      firstAlertShownRef.current &&
      !secondAlertTimeoutRef.current
    ) {
      secondAlertTimeoutRef.current = setTimeout(() => {
        setAlert({
          type: 'warning',
          message: 'Você continuou por bastante tempo. Uma pausa agora pode ajudar sua mente 🌿',
        });
      }, 30 * 60 * 1000);
    }
  };

  if (!cognitiveAlerts || !alert) return null;

  const getIcon = () => {
    switch (alert.type) {
      case 'success':
        return <EmojiEvents />;
      case 'warning':
        return <Warning />;
      default:
        return <Info />;
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
