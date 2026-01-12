import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import { TrendingUp, People, Assignment, CheckCircle } from '@mui/icons-material';

export default function Painel() {
  const stats = [
    { title: 'Total de Usuários', value: '1,234', icon: <People fontSize="large" />, color: '#1976d2' },
    { title: 'Tarefas Ativas', value: '48', icon: <Assignment fontSize="large" />, color: '#ed6c02' },
    { title: 'Tarefas Concluídas', value: '156', icon: <CheckCircle fontSize="large" />, color: '#2e7d32' },
    { title: 'Taxa de Crescimento', value: '+23%', icon: <TrendingUp fontSize="large" />, color: '#9c27b0' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Painel de Controle
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Acompanhe as principais métricas e estatísticas do sistema.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {stats.map((stat) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.title}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Box sx={{ color: stat.color, mb: 2 }}>
                {stat.icon}
              </Box>
              <Typography variant="h4" component="div" gutterBottom>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
