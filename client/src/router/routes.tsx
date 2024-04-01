import { lazy } from 'react';
const Home = lazy(() => import('../pages/Home'));
const Registration = lazy(() => import('../pages/Registration'));
const Login = lazy(() => import('../pages/Login'));
const Post = lazy(() => import('../pages/FullPost'));
const People = lazy(() => import('../pages/People'));

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
  {
    path: '/post/:id',
    element: <Post />,
  },
  //People Page
  {
    path: '/people',
    element: <People />,
  },
];

export default routes;
