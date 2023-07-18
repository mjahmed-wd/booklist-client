import { useAddReviewMutation } from '@/redux/features/book/bookApi';
import { useAppSelector } from '@/redux/hook';
import { Field, Formik, FormikValues } from 'formik';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Form, useNavigate, useParams } from 'react-router-dom';
// ...import statements

type Props = {};

const AddReview = (props: Props) => {
  const user = useAppSelector((state) => state.user);
  const { id = undefined } = useParams<{ id: string }>();
  const [addReview] = useAddReviewMutation();
  const navigate = useNavigate();

  const saveHandler = async () => {
    try {
      const options = {
        id: id!,
        data: { user: user.id, comment: comment },
      };

      await addReview(options).unwrap();

      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const [comment, setComment] = useState('');

  return (
    <div>
      <Formik
        initialValues={{ comment: '' }}
        validateOnBlur={true}
        onSubmit={(values) => {
          console.log(values);
          // saveHandler(values);
        }}
      >
        {({ handleSubmit }) => (
          <Form>
            <div className="form-floating mb-3">
              <textarea
                className="form-control"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Leave a comment here"
                id="floatingTextarea2"
                style={{ height: '100px' }}
              />
              <label htmlFor="floatingTextarea2">Your Review</label>
            </div>
            <Button
              type="button"
              onClick={saveHandler}
              variant="outline-success"
              className='me-3'
            >
              Add Review
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddReview;
