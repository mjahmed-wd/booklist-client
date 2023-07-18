import App from '@/App';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AddEditBooks from '@/pages/Books/AddBooks';
import config from '@/config';
import Books from '@/pages/Books';
import BookDetails from '@/pages/Books/BookDetails';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: config.routes.books.index,
        element: <Books />,
      },
    ],
  },
  {
    path: `${config.routes.books.index}/:id`,
    element: <BookDetails />,
  },
  {
    path: `${config.routes.books.index}/:id/edit`,
    element: (
      <PrivateRoute>
        <AddEditBooks />
      </PrivateRoute>
    ),
  },
  {
    path: config.routes.books.addBook,
    element: (
      <PrivateRoute>
        <AddEditBooks />
      </PrivateRoute>
    ),
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
