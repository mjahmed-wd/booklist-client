import { useSignUpMutation } from '@/redux/features/user/userApi';
import { useAppSelector } from '@/redux/hook';
import { Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {};

const SignUp = (props: Props) => {
  const navigate = useNavigate()
  const [signUpUser] = useSignUpMutation();

  const user = useAppSelector((state) => state.user);

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
          signUpUser(values);
        }}
      >
        <Form>
          <Field type="email" name="email" placeholder="Email" />
          <Field type="password" name="password" placeholder="Password" />
          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUp;
