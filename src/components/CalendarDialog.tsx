import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Paper,
  Chip,
  useTheme,
} from '@mui/material';
import { Close, CalendarToday } from '@mui/icons-material';
import { useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import type { Task } from '../domain/entities/Task';

interface CalendarDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CalendarDialog({ open, onClose }: CalendarDialogProps) {
  const theme = useTheme();
  const { tasks } = useTaskStore();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Função para obter tarefas por data
  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) => {
      if (!task.startDate && !task.dueDate) return false;
      
      const dateStr = date.toISOString().split('T')[0];
      const startStr = task.startDate ? new Date(task.startDate).toISOString().split('T')[0] : null;
      const dueStr = task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : null;
      
      return startStr === dateStr || dueStr === dateStr;
    });
  };

  // Função para verificar se uma data tem tarefas
  const hasTasksOnDate = (date: Date) => {
    return getTasksForDate(date).length > 0;
  };

  // Gerar dias do mês
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];
    
    // Adicionar dias vazios do mês anterior
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Adicionar dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const days = getDaysInMonth(selectedDate);
  const monthName = selectedDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const changeMonth = (direction: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  const tasksOnSelectedDate = selectedDate ? getTasksForDate(selectedDate) : [];

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return theme.palette.error.main;
      case 'medium':
        return theme.palette.warning.main;
      case 'low':
        return theme.palette.success.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getStatusLabel = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'A Fazer';
      case 'in-progress':
        return 'Em Andamento';
      case 'done':
        return 'Concluída';
      default:
        return status;
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      PaperProps={{ sx: { minWidth: '500px' } }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarToday />
          <Typography variant="h6">Calendário de Tarefas</Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Controles do mês */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <IconButton onClick={() => changeMonth(-1)}>←</IconButton>
            <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
              {monthName}
            </Typography>
            <IconButton onClick={() => changeMonth(1)}>→</IconButton>
          </Box>

          {/* Grid do calendário */}
          <Paper elevation={2} sx={{ p: 1.5 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: 1,
                mb: 0.5,
              }}
            >
              {weekDays.map((day) => (
                <Typography
                  key={day}
                  variant="body2"
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'text.secondary',
                  }}
                >
                  {day}
                </Typography>
              ))}
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: 1,
              }}
            >
              {days.map((day, index) => {
                const isToday = day && day.toDateString() === new Date().toDateString();
                const isSelected = day && day.toDateString() === selectedDate.toDateString();
                const hasTasks = day && hasTasksOnDate(day);

                return (
                  <Box
                    key={index}
                    onClick={() => day && setSelectedDate(day)}
                    sx={{
                      aspectRatio: '1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      cursor: day ? 'pointer' : 'default',
                      borderRadius: 1,
                      border: isSelected ? `2px solid ${theme.palette.primary.main}` : '1px solid transparent',
                      backgroundColor: isToday
                        ? theme.palette.primary.main + '20'
                        : day
                        ? theme.palette.background.paper
                        : 'transparent',
                      transition: 'all 0.2s ease',
                      '&:hover': day && {
                        backgroundColor: theme.palette.action.hover,
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    {day && (
                      <>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: isToday ? 'bold' : 'normal',
                            color: isSelected ? 'primary.main' : 'text.primary',
                          }}
                        >
                          {day.getDate()}
                        </Typography>
                        {hasTasks && (
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 2,
                              width: 4,
                              height: 4,
                              borderRadius: '50%',
                              backgroundColor: 'primary.main',
                            }}
                          />
                        )}
                      </>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Paper>

          {/* Lista de tarefas do dia selecionado */}
          {tasksOnSelectedDate.length > 0 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Tarefas para {selectedDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {tasksOnSelectedDate.map((task) => {
                  const isStartDate = task.startDate && 
                    new Date(task.startDate).toDateString() === selectedDate.toDateString();
                  const isDueDate = task.dueDate && 
                    new Date(task.dueDate).toDateString() === selectedDate.toDateString();

                  return (
                    <Paper
                      key={task.id}
                      elevation={1}
                      sx={{
                        p: 1.5,
                        borderLeft: `4px solid ${getPriorityColor(task.priority)}`,
                        transition: 'transform 0.2s ease',
                        '&:hover': {
                          transform: 'translateX(4px)',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 0.75 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {task.title}
                        </Typography>
                        <Chip
                          label={getStatusLabel(task.status)}
                          size="small"
                          color={task.status === 'done' ? 'success' : task.status === 'in-progress' ? 'info' : 'default'}
                        />
                      </Box>
                      {task.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.75 }}>
                          {task.description}
                        </Typography>
                      )}
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {isStartDate && (
                          <Chip label="Início" size="small" color="primary" variant="outlined" />
                        )}
                        {isDueDate && (
                          <Chip label="Término" size="small" color="secondary" variant="outlined" />
                        )}
                        <Chip
                          label={`Prioridade: ${task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}`}
                          size="small"
                          color={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'success'}
                        />
                      </Box>
                    </Paper>
                  );
                })}
              </Box>
            </Box>
          )}

          {tasksOnSelectedDate.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 2.5 }}>
              <Typography variant="body1" color="text.secondary">
                Nenhuma tarefa para {selectedDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
