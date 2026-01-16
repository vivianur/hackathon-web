import { Container, Typography, Box, Paper, Grid, Chip, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { ViewKanban, ViewList } from '@mui/icons-material';
import { useState } from 'react';
import AccessibleContainer from '../components/AccessibleContainer';
import TaskDialog from '../components/TaskDialog';
import TaskCard from '../components/TaskCard';
import PomodoroTimer from '../components/PomodoroTimer';
import { useTaskStore } from '../store/taskStore';
import { useSpacing } from '../hooks/useSpacing';
import { useAccessibilityStore } from '../store/accessibilityStore';
import { useThemeStore } from '../store/themeStore';
import type { TaskStatus } from '../domain/entities/Task';

export default function Tarefas() {
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const tasks = useTaskStore((state) => state.tasks);
  const spacing = useSpacing();
  const detailedMode = useAccessibilityStore((state) => state.detailedMode);
  const mode = useThemeStore((state) => state.mode);

  const getColumnColor = (originalColor: string) => {
    if (!detailedMode) return originalColor;
    // Modo monocromático: usar tons de cinza
    if (originalColor === '#ed6c02') return mode === 'light' ? '#666666' : '#888888'; // todo
    if (originalColor === '#0288d1') return mode === 'light' ? '#555555' : '#999999'; // in-progress
    if (originalColor === '#2e7d32') return mode === 'light' ? '#444444' : '#aaaaaa'; // done
    return originalColor;
  };

  const columns: { status: TaskStatus; title: string; color: string }[] = [
    { status: 'todo', title: 'A Fazer', color: getColumnColor('#ed6c02') },
    { status: 'in-progress', title: 'Em Progresso', color: getColumnColor('#0288d1') },
    { status: 'done', title: 'Concluído', color: getColumnColor('#2e7d32') },
  ];

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <AccessibleContainer>
      <Container maxWidth="xl" sx={{ pt: 4, pb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom>
              Organizador de Tarefas
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Gerencie suas atividades com suporte cognitivo
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={(_, newView) => newView && setView(newView)}
              size="small"
            >
              <ToggleButton value="kanban">
                <ViewKanban sx={{ mr: 1 }} /> Kanban
              </ToggleButton>
              <ToggleButton value="list">
                <ViewList sx={{ mr: 1 }} /> Lista
              </ToggleButton>
            </ToggleButtonGroup>
            <TaskDialog />
          </Box>
        </Box>

        <PomodoroTimer />

        {view === 'kanban' ? (
          <Grid container spacing={spacing.gridSpacing}>
            {columns.map((column) => {
              const columnTasks = getTasksByStatus(column.status);
              return (
                <Grid size={{ xs: 12, md: 4 }} key={column.status}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 2,
                      minHeight: 400,
                      bgcolor: 'background.default',
                      borderTop: 3,
                      borderColor: column.color,
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" fontWeight="bold">
                        {column.title}
                      </Typography>
                      <Chip
                        label={columnTasks.length}
                        sx={{
                          bgcolor: column.color,
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                        size="small"
                      />
                    </Box>
                    <Box>
                      {columnTasks.length === 0 ? (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ textAlign: 'center', mt: 4, fontStyle: 'italic' }}
                        >
                          Nenhuma tarefa
                        </Typography>
                      ) : (
                        columnTasks.map((task) => (
                          <TaskCard key={task.id} task={task} />
                        ))
                      )}
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Box>
            {tasks.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                  Nenhuma tarefa criada ainda.
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Clique em "Nova Tarefa" para começar!
                </Typography>
              </Paper>
            ) : (
              tasks.map((task) => <TaskCard key={task.id} task={task} />)
            )}
          </Box>
        )}

        <Box sx={{ mt: 4 }}>
          <Paper sx={{ 
            p: 3, 
            bgcolor: detailedMode 
              ? (mode === 'light' ? '#666666' : '#888888')
              : 'info.main', 
            color: 'white' 
          }}>
            <Typography variant="h6" gutterBottom>
              💡 Dicas para Melhor Produtividade
            </Typography>
            <ul>
              <li>Divida tarefas grandes em subtarefas menores</li>
              <li>Use o timer Pomodoro para manter o foco</li>
              <li>Priorize 3 tarefas principais por dia</li>
              <li>Faça pausas regulares para evitar sobrecarga</li>
            </ul>
          </Paper>
        </Box>
      </Container>
    </AccessibleContainer>
  );
}

