import { Outlet } from 'react-router-dom';
import './App.css';
import CustomNavbar from './components/Navbar';

function App() {
  return (
    <>
      <CustomNavbar/>
      <Outlet />
      <footer className='mt-5 d-flex justify-content-center align-items-center bg-dark p-5 text-white'>
        Book list app is a redux practice app
      </footer>
    </>
  );
}

export default App;
