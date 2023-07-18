import config from '@/config';
import { setUser, userInitialState } from '@/redux/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

type Props = {};

const CustomNavbar = (props: Props) => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const userAuthActionHandler = async () => {
    if (user?.email) {
      dispatch(setUser(userInitialState))
    } else {
      navigate(config.routes.auth.login);
    }
  };
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Book List</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          ></Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button
              type="button"
              onClick={userAuthActionHandler}
              variant="outline-success"
            >
              {user?.email ? 'Logout' : 'Login'}
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
