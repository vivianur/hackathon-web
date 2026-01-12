import { Container, Typography, Box, Paper, Switch, FormControlLabel, Divider, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useState } from 'react';

export default function Config() {
  const [notificacoes, setNotificacoes] = useState(true);
  const [modoEscuro, setModoEscuro] = useState(false);
  const [idioma, setIdioma] = useState('pt-BR');

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Configurações
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Personalize sua experiência no sistema.
      </Typography>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Preferências Gerais
        </Typography>
        <Box sx={{ mt: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={notificacoes}
                onChange={(e) => setNotificacoes(e.target.checked)}
              />
            }
            label="Ativar notificações"
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={modoEscuro}
                onChange={(e) => setModoEscuro(e.target.checked)}
              />
            }
            label="Modo escuro"
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Idioma e Região
        </Typography>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Idioma</InputLabel>
          <Select
            value={idioma}
            label="Idioma"
            onChange={(e) => setIdioma(e.target.value)}
          >
            <MenuItem value="pt-BR">Português (Brasil)</MenuItem>
            <MenuItem value="en-US">English (US)</MenuItem>
            <MenuItem value="es-ES">Español</MenuItem>
          </Select>
        </FormControl>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Privacidade
        </Typography>
        <Box sx={{ mt: 2 }}>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Permitir cookies analíticos"
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Compartilhar dados de uso"
          />
        </Box>
      </Paper>
    </Container>
  );
}
