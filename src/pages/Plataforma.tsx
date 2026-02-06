import { Container, Typography, Box, Card, CardContent, CardMedia, Grid, ToggleButton, ToggleButtonGroup, List, ListItem, ListItemText, Button } from '@mui/material';
import { Language as PlataformaIcon, ViewModule, ViewList, ArrowBack, PlayCircleOutline, TextSnippet } from '@mui/icons-material';
import AccessibleContainer from '../components/AccessibleContainer';
import { useSpacing } from '../hooks/useSpacing';
import { useAccessibilityStore } from '../store/accessibilityStore';
import { useState } from 'react';

export default function Plataforma() {
  const spacing = useSpacing();
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');
  const complexityLevel = useAccessibilityStore((state) => state.complexityLevel);
  const [selectedTopic, setSelectedTopic] = useState<null | { titulo: string; descricao: string; imagem: string; aulas: string[] }>(null);

  const getHoverEffect = () => {
    if (complexityLevel === 'simple') {
      return {
        transition: 'box-shadow 0.2s ease',
        '&:hover': {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      };
    } else if (complexityLevel === 'detailed') {
      return {
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
          transform: 'translateY(-8px) scale(1.02)',
        },
      };
    } else {
      // moderate
      return {
        transition: 'all 0.25s ease',
        '&:hover': {
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
          transform: 'translateY(-4px)',
        },
      };
    }
  };
  const recursos: { titulo: string; descricao: string; imagem: string; aulas: string[] }[] = [
    {
      titulo: 'Inteligência Artificial',
      descricao: 'Conheça ferramentas e recursos de IA para otimizar seu trabalho.',
      imagem: '/assets/plataforma/ai.svg',
      aulas: ['Aula 1: Introdução à IA', 'Aula 2: Aprendizado Supervisionado', 'Aula 3: Redes Neurais'],
    },
    {
      titulo: 'Análise de Dados',
      descricao: 'Descubra insights poderosos através da análise de dados.',
      imagem: '/assets/plataforma/data.svg',
      aulas: ['Aula 1: Estatística Básica', 'Aula 2: Limpeza de Dados', 'Aula 3: Visualização de Dados'],
    },
    {
      titulo: 'Automação',
      descricao: 'Automatize processos e aumente sua produtividade.',
      imagem: '/assets/plataforma/automation.svg',
      aulas: ['Aula 1: RPA Conceitos', 'Aula 2: Ferramentas de Automação', 'Aula 3: Boas Práticas'],
    },
    {
      titulo: 'Cloud Computing',
      descricao: 'Aprenda sobre soluções em nuvem e arquitetura escalável.',
      imagem: '/assets/plataforma/cloud.svg',
      aulas: ['Aula 1: Conceitos de Nuvem', 'Aula 2: Serviços IaaS/PaaS/SaaS', 'Aula 3: Arquitetura Escalável'],
    },
    {
      titulo: 'DevOps',
      descricao: 'Melhore a integração e entrega contínua dos seus projetos.',
      imagem: '/assets/plataforma/devops.svg',
      aulas: ['Aula 1: Cultura DevOps', 'Aula 2: CI/CD', 'Aula 3: Observabilidade'],
    },
    {
      titulo: 'Segurança',
      descricao: 'Proteja seus sistemas com as melhores práticas de segurança.',
      imagem: '/assets/plataforma/security.svg',
      aulas: ['Aula 1: Fundamentos de Segurança', 'Aula 2: Autenticação e Autorização', 'Aula 3: Monitoramento'],
    },
  ];

  const openTopic = (topic: { titulo: string; descricao: string; imagem: string; aulas: string[] }) => setSelectedTopic(topic);
  const goBack = () => setSelectedTopic(null);

  return (
    <AccessibleContainer>
      <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PlataformaIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
            <Box>
              <Typography variant="h4" component="h1">
                Plataforma
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Descubra novos recursos e funcionalidades
              </Typography>
            </Box>
          </Box>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, newMode) => newMode && setViewMode(newMode)}
            aria-label="Modo de visualização"
          >
            <ToggleButton value="cards" aria-label="Visualizar como cards">
              <ViewModule />
            </ToggleButton>
            <ToggleButton value="list" aria-label="Visualizar como lista">
              <ViewList />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {selectedTopic ? (
          <Box sx={{ mt: 2 }}>
            <Button startIcon={<ArrowBack />} onClick={goBack} sx={{ mb: 1 }}>
              Voltar
            </Button>
            <Typography variant="h5" sx={{ mt: 1, mb: 1 }}>
              {selectedTopic.titulo}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {selectedTopic.descricao}
            </Typography>
            <List>
              {selectedTopic.aulas.map((aula, idx) => (
                <ListItem key={idx} sx={{ mb: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2, bgcolor: 'background.paper', ...getHoverEffect() }}>
                  <ListItemText
                    primary={<Typography variant="subtitle1">{aula}</Typography>}
                    secondary={<Typography variant="body2" color="text.secondary">Material e exercícios</Typography>}
                  />
                  <Box sx={{ display: 'flex', gap: 1.5, ml: 'auto' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<PlayCircleOutline />}
                      sx={{ textTransform: 'none', borderRadius: 2, px: 2, boxShadow: (theme) => theme.shadows[2] }}
                    >
                      Vídeo
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<TextSnippet />}
                      sx={{ textTransform: 'none', borderRadius: 2, px: 2, boxShadow: (theme) => theme.shadows[2] }}
                    >
                      Texto
                    </Button>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        ) : viewMode === 'cards' ? (
          <Grid container spacing={spacing.gridSpacing} sx={{ mt: 2 }}>
            {recursos.map((recurso, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Card onClick={() => openTopic(recurso)} sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer', ...getHoverEffect() }}>
                  <CardMedia
                    component="div"
                    sx={{
                      pt: '56.25%',
                      bgcolor: 'grey.200',
                    }}
                    image={recurso.imagem}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    {viewMode !== 'cards' && (
                      <Typography gutterBottom variant="h6" component="h2">
                        {recurso.titulo}
                      </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary">
                      {recurso.descricao}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <List sx={{ mt: 2 }}>
            {recursos.map((recurso, index) => (
              <ListItem onClick={() => openTopic(recurso)} key={index} sx={{ mb: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2, bgcolor: 'background.paper', cursor: 'pointer', ...getHoverEffect() }}>
                <ListItemText
                  primary={<Typography variant="h6">{recurso.titulo}</Typography>}
                  secondary={<Typography variant="body2" sx={{ mt: 1 }}>{recurso.descricao}</Typography>}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Container>
    </AccessibleContainer>
  );
}
