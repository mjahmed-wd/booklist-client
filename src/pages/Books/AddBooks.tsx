import { useAddBookMutation } from '@/redux/features/book/bookApi';
import { Field, Form, Formik, FormikValues } from 'formik';
import { useNavigate } from 'react-router-dom';

type Props = {};

const AddBooks = (props: Props) => {
  const navigate = useNavigate();
  const [addBook] = useAddBookMutation();

  const saveHandler = (values: FormikValues) => {
    try {
      addBook(values);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          title: '',
          author: '',
          genre: '',
          publicationDate: '',
        }}
        validateOnBlur={true}
        onSubmit={(values) => {
          saveHandler(values);
        }}
      >
        <Form>
          <Field type="text" name="title" placeholder="Book Title" />
          <Field type="text" name="author" placeholder="Book Author" />
          <Field type="text" name="genre" placeholder="Genre" />
          <Field
            type="date"
            name="publicationDate"
            placeholder="Publication Date"
          />
          <button type="submit">Add new Book</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddBooks;
