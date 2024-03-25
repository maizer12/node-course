import { lazy } from 'react';
const Home = lazy(() => import('../pages/Home'));
const Registration = lazy(() => import('../pages/Registration'));
const Login = lazy(() => import('../pages/Login'));

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/registration',
    element: <Registration />,
  },
  {
    path: '/login',
    element: <Login />,
  },
];

export default routes;
