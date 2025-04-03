import { Routes, Route } from 'react-router-dom';
import Auth from '@/pages/auth';

export const AppRoutes = () => (
  <Routes>
    <Route path="/auth" element={<Auth />} />
  </Routes>
);
