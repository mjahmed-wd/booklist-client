import { useLoginMutation } from '@/redux/features/user/userApi';
import { useAppSelector } from '@/redux/hook';
import { Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {};

const Login = (props: Props) => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [loginUser] = useLoginMutation();

  useEffect(() => {
    if (user.email) {
      navigate('/');
    }
  }, [user]);

  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validateOnBlur={true}
        onSubmit={(values) => {
          loginUser(values);
        }}
      >
        <Form>
          <Field type="email" name="email" placeholder="Email" />
          <Field type="password" name="password" placeholder="Password" />
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
