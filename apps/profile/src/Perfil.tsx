import { Container, Typography, Box, Paper, Avatar, TextField, Button, Chip, FormControl, InputLabel, Select, MenuItem, Alert } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Person, Psychology, AccessTime, LocalCafe } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import {
  AccessibleContainer,
  FocusCard,
  useProfileStore
} from '@mindease/shared';

export default function Perfil() {
  const { profile, setProfile, updateProfile, updateStudyRoutine, addNeurodivergence, removeNeurodivergence } = useProfileStore();
  const [isEditing, setIsEditing] = useState(false);

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
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Perfil do Usuário
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Gerencie suas informações e preferências pessoais
        </Typography>

        <Paper sx={{ p: 4, mt: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Avatar sx={{ width: 100, height: 100, mb: 2, bgcolor: 'primary.main' }}>
              <Person sx={{ fontSize: 60 }} />
            </Avatar>
            <Typography variant="h5">{profile.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {profile.email}
            </Typography>
          </Box>

          <Grid container spacing={3}>
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

        <FocusCard title="Neurodivergências" icon={<Psychology color="primary" />} defaultExpanded>
          <Alert severity="info" sx={{ mb: 2 }}>
            Identifique suas necessidades para que possamos personalizar melhor sua experiência.
          </Alert>
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
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Período Preferido</InputLabel>
                <Select
                  value={profile.studyRoutine?.preferredStudyTime || 'morning'}
                  label="Período Preferido"
                  onChange={(e) =>
                    updateStudyRoutine({
                      preferredStudyTime: e.target.value as 'morning' | 'afternoon' | 'evening' | 'night',
                      sessionDuration: profile.studyRoutine?.sessionDuration || 25,
                      breakDuration: profile.studyRoutine?.breakDuration || 5,
                      focusTechnique: profile.studyRoutine?.focusTechnique || 'pomodoro',
                    })
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
                      preferredStudyTime: profile.studyRoutine?.preferredStudyTime || 'morning',
                      sessionDuration: profile.studyRoutine?.sessionDuration || 25,
                      breakDuration: profile.studyRoutine?.breakDuration || 5,
                      focusTechnique: e.target.value as 'pomodoro' | 'custom' | 'flexible',
                    })
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
                    preferredStudyTime: profile.studyRoutine?.preferredStudyTime || 'morning',
                    sessionDuration: parseInt(e.target.value) || 25,
                    breakDuration: profile.studyRoutine?.breakDuration || 5,
                    focusTechnique: profile.studyRoutine?.focusTechnique || 'pomodoro',
                  })
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
                    preferredStudyTime: profile.studyRoutine?.preferredStudyTime || 'morning',
                    sessionDuration: profile.studyRoutine?.sessionDuration || 25,
                    breakDuration: parseInt(e.target.value) || 5,
                    focusTechnique: profile.studyRoutine?.focusTechnique || 'pomodoro',
                  })
                }
              />
            </Grid>
          </Grid>
        </FocusCard>

        <Paper sx={{ p: 3, mt: 3, bgcolor: 'success.main', color: 'white' }}>
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
