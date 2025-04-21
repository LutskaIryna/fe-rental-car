import { Navigate, useRoutes } from "react-router-dom";
import CarsPage from '@/pages/main/cars/CarsPage';
import { LoginForm } from '@/pages/auth/LoginPage';
import { SignupForm } from '@/pages/auth/SignupPage';
import { RentalsPage } from '@/pages/main/RentalsPage';
import { MainLayout } from '@/components/layouts/MainLayout';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { AdminPage } from '@/pages/main/admin/AdminPage';
import PrivateRoute from '@/pages/auth/components/PrivateRoute';

export const AppRoutes = () =>
  useRoutes([
    {
      path: "/",
      element: <Navigate to="/cars" replace />,
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
        },
      ],
    },
  ]);
