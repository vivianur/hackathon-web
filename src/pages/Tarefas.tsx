import { Container, Typography, Box, Paper, List, ListItem, ListItemText, Chip } from '@mui/material';

export default function Tarefas() {
  const tarefas = [
    { id: 1, titulo: 'Implementar autenticação', status: 'Em andamento', prioridade: 'Alta' },
    { id: 2, titulo: 'Criar testes unitários', status: 'Pendente', prioridade: 'Média' },
    { id: 3, titulo: 'Documentar API', status: 'Concluída', prioridade: 'Baixa' },
    { id: 4, titulo: 'Revisar código do módulo de usuários', status: 'Em andamento', prioridade: 'Alta' },
    { id: 5, titulo: 'Atualizar dependências', status: 'Pendente', prioridade: 'Média' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluída':
        return 'success';
      case 'Em andamento':
        return 'info';
      default:
        return 'default';
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'Alta':
        return 'error';
      case 'Média':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tarefas
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Gerencie e acompanhe o progresso das suas tarefas.
      </Typography>

      <Paper sx={{ mt: 3 }}>
        <List>
          {tarefas.map((tarefa, index) => (
            <ListItem
              key={tarefa.id}
              divider={index < tarefas.length - 1}
              sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
            >
              <ListItemText
                primary={tarefa.titulo}
                secondary={`ID: ${tarefa.id}`}
                sx={{ flex: 1 }}
              />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip
                  label={tarefa.status}
                  color={getStatusColor(tarefa.status)}
                  size="small"
                />
                <Chip
                  label={tarefa.prioridade}
                  color={getPrioridadeColor(tarefa.prioridade)}
                  size="small"
                  variant="outlined"
                />
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
