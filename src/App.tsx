import { Link, Outlet } from 'react-router-dom';
import './App.css';
import config from './config';

function App() {
  return (
    <>
      <Link to={config.routes.books.addBook}>Add book</Link>
      <br />
      <br />
      <Outlet />
    </>
  );
}

export default App;
