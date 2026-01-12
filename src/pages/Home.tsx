import { Container, Typography, Box, Paper } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Bem-vindo ao Hackathon FIAP
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Explore as funcionalidades do sistema através do menu de navegação.
        </Typography>
      </Box>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1" paragraph>
          Esta é a página inicial do projeto Hackathon FIAP. Utilize o menu de navegação
          para acessar as diferentes seções do sistema:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1"><strong>Painel:</strong> Visualize dados e estatísticas</Typography>
          </li>
          <li>
            <Typography variant="body1"><strong>Tarefas:</strong> Gerencie suas atividades</Typography>
          </li>
          <li>
            <Typography variant="body1"><strong>Perfil:</strong> Atualize suas informações pessoais</Typography>
          </li>
          <li>
            <Typography variant="body1"><strong>Config.:</strong> Ajuste as configurações do sistema</Typography>
          </li>
          <li>
            <Typography variant="body1"><strong>Explore:</strong> Descubra novos recursos</Typography>
          </li>
        </ul>
      </Paper>
    </Container>
  );
}
