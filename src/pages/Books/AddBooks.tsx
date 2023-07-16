import {
  useAddBookMutation,
  useEditBookMutation,
  useGetSingleBookQuery,
} from '@/redux/features/book/bookApi';
import { bookGenre } from '@/utils/constant';
import { Field, Form, Formik, FormikValues } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {};

const AddEditBooks = (props: Props) => {
  const navigate = useNavigate();
  const { id = undefined } = useParams<{ id: string }>();
  const { data } = useGetSingleBookQuery(id);
  const [addBook] = useAddBookMutation();
  const [editBook] = useEditBookMutation();

  const saveHandler = async (values: FormikValues) => {
    try {
      if (id) {
        const options = {
          id: id!,
          data: values,
        };

        await editBook(options).unwrap();
      } else {
        await addBook(values);
      }
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={
          data || {
            title: '',
            author: '',
            genre: '',
            publicationDate: '',
          }
        }
        validateOnBlur={true}
        onSubmit={(values) => {
          saveHandler(values);
        }}
      >
        <Form>
          <Field type="text" name="title" placeholder="Book Title" />
          <Field type="text" name="author" placeholder="Book Author" />
          <Field name="genre" as="select">
            {bookGenre.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Field>
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

export default AddEditBooks;
