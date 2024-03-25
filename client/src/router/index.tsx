import { createBrowserRouter } from 'react-router-dom';
import routes from './routes';
import Layout from '../layout';

const finalRoutes = routes.map((route) => {
  return {
    ...route,
    element: <Layout>{route.element}</Layout>,
  };
});

const router = createBrowserRouter(finalRoutes);

export default router;
