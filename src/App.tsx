
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import Requests from './pages/Requests';
import Employes from './pages/Employes';
import NotFound from './pages/NotFound';
import Evaluations from './pages/Evaluations';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/employes" element={<Employes />} />
        <Route path="/employes/ajouter" element={<Navigate to="/employes" replace />} />
        <Route path="/employes/supprimer" element={<Navigate to="/employes" replace />} />
        <Route path="/evaluations" element={<Evaluations />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
