import { Container, Typography, Box, Card, CardContent, CardMedia, CardActions, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Explore as ExploreIcon } from '@mui/icons-material';

export default function Explore() {
  const recursos = [
    {
      titulo: 'Inteligência Artificial',
      descricao: 'Explore ferramentas e recursos de IA para otimizar seu trabalho.',
      imagem: 'https://via.placeholder.com/300x200?text=AI',
    },
    {
      titulo: 'Análise de Dados',
      descricao: 'Descubra insights poderosos através da análise de dados.',
      imagem: 'https://via.placeholder.com/300x200?text=Data',
    },
    {
      titulo: 'Automação',
      descricao: 'Automatize processos e aumente sua produtividade.',
      imagem: 'https://via.placeholder.com/300x200?text=Automation',
    },
    {
      titulo: 'Cloud Computing',
      descricao: 'Aprenda sobre soluções em nuvem e arquitetura escalável.',
      imagem: 'https://via.placeholder.com/300x200?text=Cloud',
    },
    {
      titulo: 'DevOps',
      descricao: 'Melhore a integração e entrega contínua dos seus projetos.',
      imagem: 'https://via.placeholder.com/300x200?text=DevOps',
    },
    {
      titulo: 'Segurança',
      descricao: 'Proteja seus sistemas com as melhores práticas de segurança.',
      imagem: 'https://via.placeholder.com/300x200?text=Security',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <ExploreIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4" component="h1">
            Explore
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Descubra novos recursos e funcionalidades
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {recursos.map((recurso, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="div"
                sx={{
                  pt: '56.25%', // 16:9 aspect ratio
                  bgcolor: 'grey.200',
                }}
                image={recurso.imagem}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {recurso.titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {recurso.descricao}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Saiba Mais
                </Button>
                <Button size="small">Experimentar</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
