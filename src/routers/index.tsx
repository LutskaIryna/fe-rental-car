import CarsPage from '@/pages/main/CarsPage';
import { LoginForm } from '@/pages/auth/LoginPage';
import { SignupForm } from '@/pages/auth/SignupPage';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import RentalsPage from '@/pages/main/RentalsPage';
import MainLayout from '@/components/layouts/MainLayout';
import AuthLayout from '@/components/layouts/AuthLayout';
import AuthRedirect from '@/pages/auth/AuthRedirect';
import AdminPage from '@/pages/main/AdminPage';


const PrivateRoute = () => {
  const token = localStorage.getItem('access_token');
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export const AppRoutes = () => (
  useRoutes([
    {
      path: "/",
      element: <AuthRedirect />,
    },
    {
      element: <AuthLayout />,
      children: [
         { path: "login", element: <LoginForm /> },
         { path: "signup", element: <SignupForm /> },
      ],
    },
    {
      element: <MainLayout />,
      children: [
        {
          element: <PrivateRoute />,
          children: [
            { path: "cars", element: <CarsPage /> },
            { path: "rentals", element: <RentalsPage /> },
            { path: "admin", element: <AdminPage /> },
          ],
        }
      ],
    },
  ])
);
