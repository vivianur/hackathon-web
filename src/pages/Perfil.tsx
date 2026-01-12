import { Container, Typography, Box, Paper, Avatar, TextField, Button, Grid } from '@mui/material';
import { Person } from '@mui/icons-material';

export default function Perfil() {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Perfil do Usuário
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Visualize e edite suas informações pessoais.
      </Typography>

      <Paper sx={{ p: 4, mt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Avatar sx={{ width: 100, height: 100, mb: 2, bgcolor: 'primary.main' }}>
            <Person sx={{ fontSize: 60 }} />
          </Avatar>
          <Typography variant="h5">Usuário FIAP</Typography>
          <Typography variant="body2" color="text.secondary">
            usuario@fiap.com.br
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Nome"
              defaultValue="Usuário FIAP"
              variant="outlined"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Sobrenome"
              defaultValue="Silva"
              variant="outlined"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Email"
              defaultValue="usuario@fiap.com.br"
              variant="outlined"
              type="email"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Telefone"
              defaultValue="(11) 98765-4321"
              variant="outlined"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Sobre"
              defaultValue="Estudante de tecnologia na FIAP"
              variant="outlined"
              multiline
              rows={3}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined">Cancelar</Button>
              <Button variant="contained">Salvar Alterações</Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
