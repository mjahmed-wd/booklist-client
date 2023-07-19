import {
  useAddBookMutation,
  useEditBookMutation,
  useGetSingleBookQuery,
} from '@/redux/features/book/bookApi';
import { bookGenre } from '@/utils/constant';
import { Field, Form, Formik, FormikValues } from 'formik';
import { Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

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
        toast.success('Book edited successfully')
      } else {
        await addBook(values);
        toast.success('Book saved successfully')
      }
      navigate('/');
    } catch (error : any) {
      console.error(error);
      toast.error(error?.error?.data?.message)
    }
  };

  return (
    <Container>
      <Formik
        initialValues={
          data || {
            title: '',
            author: '',
            genre: bookGenre[0],
            publicationDate: '',
          }
        }
        validateOnBlur={true}
        onSubmit={(values) => {
          saveHandler(values);
        }}
      >
        <Form>
          <label className="col-sm-2 col-form-label">Book Title:</label>
          <Field
            type="text"
            name="title"
            placeholder="Book Title"
            className="form-control mb-2"
          />
          <label className="col-sm-2 col-form-label">Author Name:</label>
          <Field
            type="text"
            name="author"
            placeholder="Book Author"
            className="form-control mb-2"
          />
          <label className="col-sm-2 col-form-label">Book Genre:</label>
          <Field name="genre" as="select" className="form-control mb-2">
            {bookGenre.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Field>
          <label className="col-sm-2 col-form-label">
            Book Publication Date:
          </label>
          <Field
            type="date"
            name="publicationDate"
            placeholder="Publication Date"
            className="form-control mb-2"
          />
          <Button type="submit" variant="outline-success">
            {id? "Edit Book Info": "Add new Book"}
          </Button>
        </Form>
      </Formik>
    </Container>
  );
};

export default AddEditBooks;
