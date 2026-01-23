import { Box, Typography, IconButton, LinearProgress, Chip, Paper } from '@mui/material';
import { PlayArrow, Pause, Stop, Coffee } from '@mui/icons-material';
import { useEffect } from 'react';
import { usePomodoroStore } from '../store/pomodoroStore';
import { useTaskStore } from '../store/taskStore';

export default function PomodoroTimer() {
  const pomodoro = usePomodoroStore();
  const { addTimeToTask } = useTaskStore();

  useEffect(() => {
    if (!pomodoro.isActive || pomodoro.isPaused) return;

    const interval = setInterval(() => {
      pomodoro.tick();
      
      // Se acabou o timer
      if (pomodoro.timeRemaining === 0) {
        // Adiciona tempo à tarefa se houver uma tarefa ativa
        if (pomodoro.taskId && pomodoro.currentPhase === 'focus') {
          addTimeToTask(pomodoro.taskId, 25); // 25 minutos padrão
        }
        
        // Notificação sonora
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Pomodoro Concluído!', {
            body: pomodoro.currentPhase === 'focus' 
              ? 'Hora de fazer uma pausa!' 
              : 'Pronto para focar novamente?',
            icon: '/vite.svg'
          });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [pomodoro.isActive, pomodoro.isPaused, pomodoro.timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseLabel = () => {
    switch (pomodoro.currentPhase) {
      case 'focus': return 'Foco';
      case 'break': return 'Pausa Curta';
      case 'long-break': return 'Pausa Longa';
      default: return 'Inativo';
    }
  };

  const getPhaseColor = () => {
    switch (pomodoro.currentPhase) {
      case 'focus': return 'primary';
      case 'break': return 'success';
      case 'long-break': return 'info';
      default: return 'default';
    }
  };

  if (!pomodoro.isActive && pomodoro.currentPhase === 'idle') {
    return null;
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 3,
        background: (theme) =>
          pomodoro.currentPhase === 'focus'
            ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
            : `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
        color: 'white',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Chip
          label={getPhaseLabel()}
          color={getPhaseColor()}
          sx={{ mb: 2, fontWeight: 'bold' }}
        />
        <Typography variant="h2" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
          {formatTime(pomodoro.timeRemaining)}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={100 - (pomodoro.timeRemaining / (25 * 60)) * 100}
          sx={{
            height: 8,
            borderRadius: 4,
            mb: 2,
            backgroundColor: 'rgba(255,255,255,0.3)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: 'white',
            },
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
          {!pomodoro.isPaused ? (
            <IconButton
              onClick={pomodoro.pause}
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
              size="large"
            >
              <Pause />
            </IconButton>
          ) : (
            <IconButton
              onClick={pomodoro.resume}
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
              size="large"
            >
              <PlayArrow />
            </IconButton>
          )}
          <IconButton
            onClick={pomodoro.stop}
            sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
            size="large"
          >
            <Stop />
          </IconButton>
          {pomodoro.currentPhase === 'focus' && (
            <IconButton
              onClick={() => pomodoro.startBreak(pomodoro.sessionCount % 4 === 0)}
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
              size="large"
              title="Iniciar Pausa"
            >
              <Coffee />
            </IconButton>
          )}
        </Box>
        <Typography variant="body2" sx={{ mt: 2, opacity: 0.9 }}>
          Sessões completadas: {pomodoro.sessionCount}
        </Typography>
      </Box>
    </Paper>
  );
}
