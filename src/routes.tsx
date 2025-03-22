import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import { Jobs } from './pages/jobs';
import { Automation } from './pages/automation';
import { Settings } from './pages/settings';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/automation" element={<Automation />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}