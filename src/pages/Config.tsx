import { Container, Typography, Box, Switch, FormControlLabel, Divider, Button, Alert } from '@mui/material';
import ThemedAlert from '../components/ThemedAlert';
import { RestartAlt, Notifications, VolumeUp, EmojiEvents, WarningAmber } from '@mui/icons-material';
import AccessibleContainer from '../components/AccessibleContainer';
import FocusCard from '../components/FocusCard';
import { useProfileStore } from '../store/profileStore';
import { useAccessibilityStore } from '../store/accessibilityStore';

export default function Config() {
  const { profile, updatePreferences } = useProfileStore();
  const { resetToDefaults } = useAccessibilityStore();

  if (!profile) {
    return (
      <Container maxWidth="md" sx={{ pt: 4, pb: 4 }}>
        <Alert severity="info">
          Carregando configurações...
        </Alert>
      </Container>
    );
  }

  const preferences = profile.preferences;

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja restaurar todas as configurações para os valores padrão?')) {
      resetToDefaults();
      updatePreferences({
        notifications: true,
        soundEffects: true,
        encouragementMessages: true,
        transitionWarnings: true,
      });
    }
  };

  return (
    <AccessibleContainer>
      <Container maxWidth="md" sx={{ pt: 4, pb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Configurações
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Ajuste preferências de notificações e comportamento do sistema
        </Typography>

        <ThemedAlert severity="warning" sx={{ mb: 3 }}>
          As configurações de acessibilidade estão disponíveis no Painel Cognitivo
        </ThemedAlert>

        <FocusCard title="Notificações" icon={<Notifications color="primary" />} defaultExpanded>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.notifications}
                  onChange={(e) => updatePreferences({ notifications: e.target.checked })}
                  color="primary"
                />
              }
              label={
                <Box>
                  <Typography>Ativar notificações</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Receba alertas sobre tarefas e timers
                  </Typography>
                </Box>
              }
            />
          </Box>
        </FocusCard>

        <FocusCard title="Sons e Efeitos" icon={<VolumeUp color="primary" />}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.soundEffects}
                  onChange={(e) => updatePreferences({ soundEffects: e.target.checked })}
                  color="primary"
                />
              }
              label={
                <Box>
                  <Typography>Efeitos sonoros</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Sons ao completar tarefas e finalizar timers
                  </Typography>
                </Box>
              }
            />
          </Box>
        </FocusCard>

        <FocusCard title="Apoio Cognitivo" icon={<EmojiEvents color="primary" />}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.encouragementMessages}
                  onChange={(e) => updatePreferences({ encouragementMessages: e.target.checked })}
                  color="primary"
                />
              }
              label={
                <Box>
                  <Typography>Mensagens de incentivo</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Receba feedback positivo ao concluir atividades
                  </Typography>
                </Box>
              }
            />
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.transitionWarnings}
                  onChange={(e) => updatePreferences({ transitionWarnings: e.target.checked })}
                  color="primary"
                />
              }
              label={
                <Box>
                  <Typography>Avisos de transição</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Notificações suaves antes de mudanças de atividade
                  </Typography>
                </Box>
              }
            />
          </Box>
        </FocusCard>

        <Divider sx={{ my: 4 }} />

        <FocusCard title="Restaurar Padrões" icon={<WarningAmber color="warning" />}>
          <ThemedAlert severity="warning" sx={{ mb: 2 }}>
            Esta ação irá restaurar todas as configurações de acessibilidade e preferências
            para os valores padrão.
          </ThemedAlert>
          <Button
            variant="outlined"
            color="warning"
            startIcon={<RestartAlt />}
            onClick={handleReset}
            fullWidth
          >
            Restaurar Configurações Padrão
          </Button>
        </FocusCard>

        <Box sx={{ mt: 4 }}>
          <ThemedAlert severity="info">
            <Typography variant="body2" fontWeight="medium" gutterBottom>
              Dica: Configurações Salvas Automaticamente
            </Typography>
            <Typography variant="body2">
              Todas as suas configurações são salvas automaticamente no seu navegador.
              Suas preferências persistem mesmo após fechar e reabrir a aplicação.
            </Typography>
          </ThemedAlert>
        </Box>
      </Container>
    </AccessibleContainer>
  );
}

