import config from '@/config';
import { useLoginMutation } from '@/redux/features/user/userApi';
import { useAppSelector } from '@/redux/hook';
import { Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [loginUser] = useLoginMutation();

  useEffect(() => {
    if (user.email) {
      navigate('/');
    }
  }, [user]);

  return (
    <Container className="mt-5 mb-5">
      <Formik
        initialValues={{ email: '', password: '' }}
        validateOnBlur={true}
        onSubmit={(values) => {
          loginUser(values);
        }}
      >
        <Form>
          <Field
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-2"
          />
          <Field
            type="password"
            name="password"
            placeholder="Password"
            className="form-control mb-2"
          />
          <div className="d-flex justify-content-between">
            <div>
            <Button type="submit" variant="outline-success">
              {user?.email ? 'Logout' : 'Login'}
            </Button>
            </div>
              <label className="col-sm-2 col-form-label">
                Don't have an account?
              </label>
            <div>
              <Link to={config.routes.auth.signup}>Sign Up</Link>
            </div>
          </div>
        </Form>
      </Formik>
    </Container>
  );
};

export default Login;
