import CarsPage from '@/pages/auth/CarsPage';
import { LoginForm } from '@/pages/auth/LoginPage';
import { SignupForm } from '@/pages/auth/SignupPage';
import { Routes, Route } from 'react-router-dom';

export const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginForm />} />
    <Route path="/singup" element={<SignupForm />} />
    <Route path="/cars" element={<CarsPage />} />
  </Routes>
);
