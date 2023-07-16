import Review from '@/components/Review';
import config from '@/config';
import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
} from '@/redux/features/book/bookApi';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {};

const BookDetails = (props: Props) => {
  const { id } = useParams();
  const { data } = useGetSingleBookQuery(id);
  const [deleteBook] = useDeleteBookMutation();

  const navigate = useNavigate();

  const deleteHandler = () => deleteBook({ id: id! });

  return (
    <div>
      Book details
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <button
          type="button"
          onClick={() => navigate(`${config.routes.books.index}/${id}/edit`)}
        >
          Edit
        </button>
        <button type="button" onClick={deleteHandler}>
          Delete
        </button>
      </div>
      <h1>{data?.title}</h1>
      <p>Author: {data?.author}</p>
      <p>Genre: {data?.genre}</p>
      <p>Publication: {data?.publicationDate}</p>
      {data?.reviews?.map((review) => (
        <div key={review.comment}>
          <b>User: {review.user.email}</b>
          <small>{review.comment}</small>
          <hr />
        </div>
      ))}
      <Review />
    </div>
  );
};

export default BookDetails;
