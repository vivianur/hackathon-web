import { Container, Typography, Box, Switch, FormControlLabel, Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Visibility, TextFields, SpaceBar, Contrast, Accessible } from '@mui/icons-material';
import {
  AccessibleContainer,
  FocusCard,
  ThemedAlert,
  useAccessibilityStore,
  useAnimations
} from '@mindease/shared';

export default function Painel() {
  const accessibility = useAccessibilityStore();
  const animations = useAnimations();

  const complexityOptions = [
    { value: 'simple', label: 'Simples', description: 'Interface minimalista' },
    { value: 'moderate', label: 'Moderado', description: 'Equilíbrio ideal' },
    { value: 'detailed', label: 'Detalhado', description: 'Todas as opções' },
  ];

  const fontSizeOptions = [
    { value: 'small', label: 'Pequeno' },
    { value: 'medium', label: 'Médio' },
    { value: 'large', label: 'Grande' },
    { value: 'extra-large', label: 'Extra Grande' },
  ];

  const spacingOptions = [
    { value: 'compact', label: 'Compacto' },
    { value: 'comfortable', label: 'Confortável' },
    { value: 'spacious', label: 'Espaçoso' },
  ];

  return (
    <AccessibleContainer>
      <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
        <Box sx={{ mb: 4, ...animations.fadeIn }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Painel Cognitivo
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Personalize sua experiência para atender suas necessidades cognitivas
          </Typography>
          <ThemedAlert severity="success" sx={{ mt: 2 }}>
            Todas as configurações são salvas automaticamente e aplicadas em tempo real.
          </ThemedAlert>
        </Box>

        <Grid container spacing={0}>
          {/* Nível de Complexidade */}
          <Grid size={{ xs: 12 }} sx={animations.staggerDelay(0)}>
            <FocusCard title="Nível de Complexidade" icon={<TextFields color="primary" />}>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Complexidade da Interface</InputLabel>
                <Select
                  value={accessibility.complexityLevel}
                  label="Complexidade da Interface"
                  onChange={(e) => accessibility.setComplexityLevel(e.target.value as any)}
                >
                  {complexityOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Box>
                        <Typography variant="body1">{option.label}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {option.description}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box sx={{ mt: 2 }}>
                <Chip
                  label={`Atual: ${complexityOptions.find(o => o.value === accessibility.complexityLevel)?.label}`}
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </FocusCard>
          </Grid>

          {/* Modos de Visualização */}
          <Grid size={{ xs: 12 }} sx={animations.staggerDelay(1)}>
            <FocusCard title="Modos de Visualização" icon={<Visibility color="primary" />}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={accessibility.focusMode}
                      onChange={accessibility.toggleFocusMode}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography>Modo Foco</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Esconde distrações e destaca o conteúdo principal
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={accessibility.detailedMode}
                      onChange={accessibility.toggleDetailedMode}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography>Modo Monocromático</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Remove todas as cores da interface
                      </Typography>
                    </Box>
                  }
                />
              </Box>
            </FocusCard>
          </Grid>

          {/* Tamanho da Fonte */}
          <Grid size={{ xs: 12 }} sx={animations.staggerDelay(2)}>
            <FocusCard title="Tamanho da Fonte" icon={<TextFields color="primary" />}>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Tamanho</InputLabel>
                <Select
                  value={accessibility.fontSize}
                  label="Tamanho"
                  onChange={(e) => accessibility.setFontSize(e.target.value as any)}
                >
                  {fontSizeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
                Ajuste o tamanho do texto para melhor leitura
              </Typography>
            </FocusCard>
          </Grid>

          {/* Espaçamento */}
          <Grid size={{ xs: 12 }} sx={animations.staggerDelay(3)}>
            <FocusCard title="Espaçamento" icon={<SpaceBar color="primary" />}>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Espaçamento</InputLabel>
                <Select
                  value={accessibility.spacing}
                  label="Espaçamento"
                  onChange={(e) => accessibility.setSpacing(e.target.value as any)}
                >
                  {spacingOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
                Define o espaço entre elementos da interface
              </Typography>
            </FocusCard>
          </Grid>

          {/* Contraste */}
          <Grid size={{ xs: 12 }} sx={animations.staggerDelay(4)}>
            <FocusCard title="Contraste" icon={<Contrast color="primary" />}>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Nível de Contraste</InputLabel>
                <Select
                  value={accessibility.contrastLevel}
                  label="Nível de Contraste"
                  onChange={(e) => accessibility.setContrastLevel(e.target.value as any)}
                >
                  <MenuItem value="low">Baixo</MenuItem>
                  <MenuItem value="medium">Padrão</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
                Aumenta a diferença entre cores para melhor visualização
              </Typography>
            </FocusCard>
          </Grid>

          {/* Recursos Adicionais */}
          <Grid size={{ xs: 12 }} sx={animations.staggerDelay(5)}>
            <FocusCard title="Recursos Adicionais" icon={<Accessible color="primary" />}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={accessibility.animationsEnabled}
                      onChange={accessibility.toggleAnimations}
                      color="primary"
                    />
                  }
                  label="Animações"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={accessibility.cognitiveAlerts}
                      onChange={accessibility.toggleCognitiveAlerts}
                      color="primary"
                    />
                  }
                  label="Alertas Cognitivos"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={accessibility.vlibrasEnabled}
                      onChange={accessibility.toggleVlibras}
                      color="primary"
                    />
                  }
                  label="VLibras (Libras)"
                />
              </Box>
            </FocusCard>
          </Grid>
        </Grid>
      </Container>
    </AccessibleContainer>
  );
}
