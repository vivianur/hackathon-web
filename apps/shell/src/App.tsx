import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import Navbar from './components/Navbar';
import { CognitiveAlerts } from '@mindease/shared';
import Home from './pages/Home';

// Lazy load remote modules
const RemotePainel = lazy(() => import('dashboard/Painel'));
const RemoteTarefas = lazy(() => import('tasks/Tarefas'));
const RemotePerfil = lazy(() => import('profile/Perfil'));
const RemoteConfig = lazy(() => import('profile/Config'));
const RemoteExplore = lazy(() => import('dashboard/Explore'));

// Loading fallback component
function LoadingFallback() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        gap: 2,
      }}
    >
      <CircularProgress size={48} />
      <Typography variant="body1" color="text.secondary">
        Carregando módulo...
      </Typography>
    </Box>
  );
}

// Error boundary for remote modules
function RemoteWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      {children}
    </Suspense>
  );
}

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <CognitiveAlerts />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/painel"
            element={
              <RemoteWrapper>
                <RemotePainel />
              </RemoteWrapper>
            }
          />
          <Route
            path="/tarefas"
            element={
              <RemoteWrapper>
                <RemoteTarefas />
              </RemoteWrapper>
            }
          />
          <Route
            path="/perfil"
            element={
              <RemoteWrapper>
                <RemotePerfil />
              </RemoteWrapper>
            }
          />
          <Route
            path="/config"
            element={
              <RemoteWrapper>
                <RemoteConfig />
              </RemoteWrapper>
            }
          />
          <Route
            path="/explore"
            element={
              <RemoteWrapper>
                <RemoteExplore />
              </RemoteWrapper>
            }
          />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
