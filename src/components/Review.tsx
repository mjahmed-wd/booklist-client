import { useAddReviewMutation } from '@/redux/features/book/bookApi';
import { useAppSelector } from '@/redux/hook';
import { Field, Formik, FormikValues } from 'formik';
import { useState } from 'react';
import { Form, useNavigate, useParams } from 'react-router-dom';
// ...import statements

type Props = {};

const Review = (props: Props) => {
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

  const [comment, setComment] = useState('')

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
            <input type="text" name="comment" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Review" />
            <button type="button" onClick={saveHandler}>
              Add Review
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Review;
