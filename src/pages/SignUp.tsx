import config from '@/config';
import { useSignUpMutation } from '@/redux/features/user/userApi';
import { useAppSelector } from '@/redux/hook';
import { Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpUser] = useSignUpMutation();

  const user = useAppSelector((state) => state.user);

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
          signUpUser(values);
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
                Sign Up
              </Button>
            </div>
              <label className="col-sm-2 col-form-label">
                Already have an account?
              </label>
            <div>
              <Link to={config.routes.auth.login}>Login</Link>
            </div>
          </div>
        </Form>
      </Formik>
    </Container>
  );
};

export default SignUp;
