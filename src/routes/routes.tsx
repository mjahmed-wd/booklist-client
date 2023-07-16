import App from '@/App';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AddBooks from '@/pages/AddBooks';
import config from '@/config';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [],
  },
  {
    path: config.routes.books.index,
    element: <App />,
    children: [
      {
        path: config.routes.books.addBook,
        element: (
          <PrivateRoute>
            <AddBooks />
          </PrivateRoute>
        ),
        children: [],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
]);

export default routes;
