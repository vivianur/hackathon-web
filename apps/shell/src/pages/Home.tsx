import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { Dashboard, Assignment, Person, Settings, Psychology, AccessTime } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { AccessibleContainer, AnimatedCard } from '@mindease/shared';

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Dashboard sx={{ fontSize: 48 }} />,
      title: 'Painel Cognitivo',
      description: 'Personalize a interface de acordo com suas necessidades cognitivas',
      path: '/painel',
      color: '#1976d2',
    },
    {
      icon: <Assignment sx={{ fontSize: 48 }} />,
      title: 'Organizador de Tarefas',
      description: 'Gerencie atividades com suporte Kanban e timer Pomodoro',
      path: '/tarefas',
      color: '#ed6c02',
    },
    {
      icon: <Person sx={{ fontSize: 48 }} />,
      title: 'Perfil',
      description: 'Configure suas preferências e rotina de estudos',
      path: '/perfil',
      color: '#2e7d32',
    },
    {
      icon: <Settings sx={{ fontSize: 48 }} />,
      title: 'Configurações',
      description: 'Ajuste notificações e preferências do sistema',
      path: '/config',
      color: '#9c27b0',
    },
  ];

  return (
    <AccessibleContainer disableFocusBlur>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Psychology sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            MindEase
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Plataforma de Acessibilidade Cognitiva
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Desenvolvida para facilitar a vida acadêmica e profissional de pessoas neurodivergentes
            e/ou com desafios de processamento cognitivo.
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={feature.path}>
              <AnimatedCard
                animationType="grow"
                delay={index * 100}
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
                onClick={() => navigate(feature.path)}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{ color: feature.color, mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Box>
              </AnimatedCard>
            </Grid>
          ))}
        </Grid>

        <Paper
          sx={{
            p: 4,
            mb: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          }}
        >
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Recursos Principais
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Dashboard />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Interface Personalizável
                  </Typography>
                  <Typography variant="body2">
                    Ajuste complexidade, contraste, fonte e espaçamento
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Assignment />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Gestão Cognitiva de Tarefas
                  </Typography>
                  <Typography variant="body2">
                    Kanban visual com checklist e timer Pomodoro
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Psychology />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Alertas Cognitivos
                  </Typography>
                  <Typography variant="body2">
                    Notificações inteligentes e mensagens de incentivo
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <AccessTime />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Modo Foco
                  </Typography>
                  <Typography variant="body2">
                    Reduza distrações e mantenha a concentração
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3, bgcolor: 'info.main', color: 'white' }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Suporte para Neurodivergências
          </Typography>
          <Typography variant="body1">
            TDAH - TEA (Autismo) - Dislexia - Burnout - Ansiedade - Sobrecarga Sensorial
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2, bgcolor: 'white', color: 'info.main', '&:hover': { bgcolor: 'grey.100' } }}
            onClick={() => navigate('/perfil')}
          >
            Configure seu Perfil
          </Button>
        </Paper>
      </Container>
    </AccessibleContainer>
  );
}
