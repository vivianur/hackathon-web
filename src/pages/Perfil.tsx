import { Container, Typography, Box, Paper, Avatar, TextField, Button, Grid, Chip, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ThemedAlert from '../components/ThemedAlert';
import { Person, Psychology, AccessTime, LocalCafe } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import AccessibleContainer from '../components/AccessibleContainer';
import FocusCard from '../components/FocusCard';
import { useProfileStore } from '../store/profileStore';
import { useAnimations } from '../hooks/useAnimations';
import { useSpacing } from '../hooks/useSpacing';

export default function Perfil() {
  const { profile, setProfile, updateProfile, updateStudyRoutine, addNeurodivergence, removeNeurodivergence } = useProfileStore();
  const [isEditing, setIsEditing] = useState(false);
  const animations = useAnimations();
  const spacing = useSpacing();

  useEffect(() => {
    // Criar perfil inicial se não existir
    if (!profile) {
      setProfile({
        id: crypto.randomUUID(),
        name: 'Usuário',
        email: 'usuario@fiap.com.br',
        neurodivergence: [],
        preferences: {
          notifications: true,
          soundEffects: true,
          encouragementMessages: true,
          transitionWarnings: true,
        },
      });
    }
  }, []);

  const [formData, setFormData] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
  });

  const neurodivergenceOptions = ['TDAH', 'TEA (Autismo)', 'Dislexia', 'Ansiedade', 'Burnout', 'Outro'];

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: profile?.name || '',
      email: profile?.email || '',
    });
    setIsEditing(false);
  };

  if (!profile) return null;

  return (
    <AccessibleContainer>
      <Container maxWidth="md" sx={{ pt: 4, pb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={animations.fadeIn}>
          Perfil do Usuário
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Gerencie suas informações e preferências pessoais
        </Typography>

        <Paper sx={{ p: 4, mt: 3, mb: 3, ...animations.slideUp }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Avatar sx={{ 
              width: 100, 
              height: 100, 
              mb: 2, 
              bgcolor: 'primary.main',
              ...(animations.level === 'detailed' && {
                animation: 'pulse 2s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.05)' },
                },
              }),
            }}>
              <Person sx={{ fontSize: 60 }} />
            </Avatar>
            <Typography variant="h5">{profile.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {profile.email}
            </Typography>
          </Box>

          <Grid container spacing={spacing.gridSpacing}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Nome"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                variant="outlined"
                type="email"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                {!isEditing ? (
                  <Button variant="contained" onClick={() => setIsEditing(true)}>
                    Editar Perfil
                  </Button>
                ) : (
                  <>
                    <Button variant="outlined" onClick={handleCancel}>
                      Cancelar
                    </Button>
                    <Button variant="contained" onClick={handleSave}>
                      Salvar Alterações
                    </Button>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <FocusCard title="Neurodivergências" icon={<Psychology color="primary" />}>
          <ThemedAlert severity="info" sx={{ mb: 3, pl: 1 }}>
            Identifique suas necessidades para que possamos personalizar melhor sua experiência.
          </ThemedAlert>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {neurodivergenceOptions.map((option) => {
              const isSelected = profile.neurodivergence?.includes(option);
              return (
                <Chip
                  key={option}
                  label={option}
                  onClick={() => {
                    if (isSelected) {
                      removeNeurodivergence(option);
                    } else {
                      addNeurodivergence(option);
                    }
                  }}
                  color={isSelected ? 'primary' : 'default'}
                  variant={isSelected ? 'filled' : 'outlined'}
                  clickable
                />
              );
            })}
          </Box>
          {profile.neurodivergence && profile.neurodivergence.length > 0 && (
            <Typography variant="body2" color="text.secondary">
              Selecionado: {profile.neurodivergence.join(', ')}
            </Typography>
          )}
        </FocusCard>

        <FocusCard title="Rotina de Estudo" icon={<AccessTime color="primary" />}>
          <Grid container spacing={spacing.gridSpacing}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Período Preferido</InputLabel>
                <Select
                  value={profile.studyRoutine?.preferredStudyTime || 'morning'}
                  label="Período Preferido"
                  onChange={(e) =>
                    updateStudyRoutine({
                      ...profile.studyRoutine,
                      preferredStudyTime: e.target.value as any,
                    } as any)
                  }
                >
                  <MenuItem value="morning">Manhã</MenuItem>
                  <MenuItem value="afternoon">Tarde</MenuItem>
                  <MenuItem value="evening">Noite</MenuItem>
                  <MenuItem value="night">Madrugada</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Técnica de Foco</InputLabel>
                <Select
                  value={profile.studyRoutine?.focusTechnique || 'pomodoro'}
                  label="Técnica de Foco"
                  onChange={(e) =>
                    updateStudyRoutine({
                      ...profile.studyRoutine,
                      focusTechnique: e.target.value as any,
                    } as any)
                  }
                >
                  <MenuItem value="pomodoro">Pomodoro (25min)</MenuItem>
                  <MenuItem value="custom">Personalizado</MenuItem>
                  <MenuItem value="flexible">Flexível</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Duração da Sessão (min)"
                type="number"
                value={profile.studyRoutine?.sessionDuration || 25}
                onChange={(e) =>
                  updateStudyRoutine({
                    ...profile.studyRoutine,
                    sessionDuration: parseInt(e.target.value) || 25,
                  } as any)
                }
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Duração da Pausa (min)"
                type="number"
                value={profile.studyRoutine?.breakDuration || 5}
                onChange={(e) =>
                  updateStudyRoutine({
                    ...profile.studyRoutine,
                    breakDuration: parseInt(e.target.value) || 5,
                  } as any)
                }
              />
            </Grid>
          </Grid>
        </FocusCard>

        <Paper sx={{ p: 3, mt: 3, bgcolor: 'primary.main', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LocalCafe sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h6" gutterBottom>
                Lembre-se de fazer pausas!
              </Typography>
              <Typography variant="body2">
                Seu bem-estar é fundamental para uma produtividade sustentável.
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </AccessibleContainer>
  );
}

