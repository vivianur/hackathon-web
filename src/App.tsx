import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import CognitiveAlerts from './components/CognitiveAlerts';
import VLibrasWidget from './components/VLibrasWidget';
import Home from './pages/Home';
import Painel from './pages/Painel';
import Tarefas from './pages/Tarefas';
import Perfil from './pages/Perfil';
import Config from './pages/Config';
import Explore from './pages/Explore';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <CognitiveAlerts />
      <VLibrasWidget />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/painel" element={<Painel />} />
          <Route path="/tarefas" element={<Tarefas />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/config" element={<Config />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
