import { Link, Outlet } from 'react-router-dom';
import './App.css';
import config from './config';

function App() {
  return (
    <>
      <Link to={config.routes.books.addBook}>Add book</Link>
      <br />
      <Link to={config.routes.books.index}>All Books</Link>
      <br />
      <br />
      <Outlet />
    </>
  );
}

export default App;
