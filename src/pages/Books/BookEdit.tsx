import { useEditBookMutation, useGetSingleBookQuery } from '@/redux/features/book/bookApi';
import { Field, Form, Formik, FormikValues } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {};

const BookEdit = (props: Props) => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>(); // Specify the type for `id` parameter
  const { data } = useGetSingleBookQuery(id);
  const [editBook] = useEditBookMutation();

  const saveHandler = async (values: FormikValues) => {
    try {
      const options = {
        id: id!,
        data: values,
      };

      await editBook(options).unwrap(); // Unwrap the promise to handle success and error cases
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {data ? ( // Add a conditional rendering check for `data` before rendering the form
        <Formik
          initialValues={data}
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
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      ) : (
        <h2>Loading...</h2> // Add a loading state while waiting for the book data to be fetched
      )}
    </div>
  );
};

export default BookEdit;
