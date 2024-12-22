import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthProvider';

import AppRoutes from './routes';
import { DiagnosisProvider } from './components/Diagnosis/DiagnosisProvider';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DiagnosisProvider>
        <Router>
          <AppRoutes />
        </Router>
        </DiagnosisProvider>
    </AuthProvider>
  );
};

export default App;