import {
  Box,
  Typography,
  IconButton,
  Checkbox,
  TextField,
  Button,
  Chip,
  LinearProgress,
  Menu,
  MenuItem,
  Card,
  CardContent,
  Collapse,
} from '@mui/material';
import {
  MoreVert,
  Delete,
  PlayArrow,
  CheckCircle,
  RadioButtonUnchecked,
  Add,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';
import { useState } from 'react';
import type { Task } from '../domain/entities/Task';
import { useTaskStore } from '../store/taskStore';
import { usePomodoroStore } from '../store/pomodoroStore';
import { useAccessibilityStore } from '../store/accessibilityStore';
import { useThemeStore } from '../store/themeStore';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [newSubtask, setNewSubtask] = useState('');
  const { deleteTask, updateTaskStatus, addSubtask, toggleSubtask, deleteSubtask } = useTaskStore();
  const { startFocus } = usePomodoroStore();
  const detailedMode = useAccessibilityStore((state) => state.detailedMode);
  const mode = useThemeStore((state) => state.mode);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    deleteTask(task.id);
    handleMenuClose();
  };

  const handleStatusChange = (newStatus: Task['status']) => {
    updateTaskStatus(task.id, newStatus);
    handleMenuClose();
  };

  const handleStartPomodoro = () => {
    startFocus(task.id, (task.estimatedTime || 25) * 60);
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      addSubtask(task.id, newSubtask);
      setNewSubtask('');
    }
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const completedSubtasks = task.subtasks.filter(s => s.completed).length;
  const progress = task.subtasks.length > 0 
    ? (completedSubtasks / task.subtasks.length) * 100 
    : 0;

  return (
    <Card sx={{ mb: 2, transition: 'all 0.3s', '&:hover': { boxShadow: 3 } }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              {task.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {task.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
              <Chip
                label={task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
                color={getPriorityColor()}
                size="small"
              />
              {task.estimatedTime && (
                <Chip
                  label={`${task.estimatedTime}min`}
                  size="small"
                  variant="outlined"
                />
              )}
              {task.timeSpent > 0 && (
                <Chip
                  label={`${task.timeSpent}min gastos`}
                  size="small"
                  color="info"
                  variant="outlined"
                />
              )}
            </Box>
          </Box>
          <Box>
            <IconButton onClick={handleStartPomodoro} color="primary" title="Iniciar Pomodoro">
              <PlayArrow />
            </IconButton>
            <IconButton onClick={handleMenuOpen}>
              <MoreVert />
            </IconButton>
          </Box>
        </Box>

        {task.subtasks.length > 0 && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Progresso: {completedSubtasks}/{task.subtasks.length}
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ 
                mb: 2,
                ...(detailedMode && {
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: mode === 'light' ? '#666666' : '#aaaaaa',
                  },
                }),
              }} 
            />
          </>
        )}

        <Box>
          <Button
            size="small"
            startIcon={showSubtasks ? <ExpandLess /> : <ExpandMore />}
            onClick={() => setShowSubtasks(!showSubtasks)}
          >
            {task.subtasks.length === 0 ? 'Adicionar Subtarefas' : `Subtarefas (${task.subtasks.length})`}
          </Button>
        </Box>

        <Collapse in={showSubtasks}>
          <Box sx={{ mt: 2, pl: 2, borderLeft: '2px solid', borderColor: 'divider' }}>
            {task.subtasks.map((subtask) => (
              <Box key={subtask.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Checkbox
                  checked={subtask.completed}
                  onChange={() => toggleSubtask(task.id, subtask.id)}
                  icon={<RadioButtonUnchecked />}
                  checkedIcon={<CheckCircle />}
                />
                <Typography
                  sx={{
                    textDecoration: subtask.completed ? 'line-through' : 'none',
                    flex: 1,
                  }}
                >
                  {subtask.title}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => deleteSubtask(task.id, subtask.id)}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            ))}
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <TextField
                size="small"
                placeholder="Nova subtarefa..."
                fullWidth
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSubtask()}
              />
              <IconButton onClick={handleAddSubtask} color="primary">
                <Add />
              </IconButton>
            </Box>
          </Box>
        </Collapse>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          {task.status !== 'todo' && (
            <MenuItem onClick={() => handleStatusChange('todo')}>
              Mover para: A Fazer
            </MenuItem>
          )}
          {task.status !== 'in-progress' && (
            <MenuItem onClick={() => handleStatusChange('in-progress')}>
              Mover para: Em Progresso
            </MenuItem>
          )}
          {task.status !== 'done' && (
            <MenuItem onClick={() => handleStatusChange('done')}>
              Mover para: Concluído
            </MenuItem>
          )}
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Delete sx={{ mr: 1 }} /> Excluir
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
}
