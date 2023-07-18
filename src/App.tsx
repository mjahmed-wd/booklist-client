import { Link, Outlet } from 'react-router-dom';
import './App.css';
import CustomNavbar from './components/Navbar';
import config from './config';
import { useAppSelector } from './redux/hook';

function App() {
  const user = useAppSelector((state) => state.user);
  return (
    <>
      <CustomNavbar/>
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
