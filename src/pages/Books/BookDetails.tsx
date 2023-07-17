import Review from '@/components/Review';
import config from '@/config';
import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
} from '@/redux/features/book/bookApi';
import { useAddToPlannedMutation, useAddToWishlistMutation, useUpdatePlannedListMutation } from '@/redux/features/user/userApi';
import { useAppSelector } from '@/redux/hook';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {};

const BookDetails = (props: Props) => {
  const { id: bookId } = useParams();
  const user = useAppSelector(state=> state.user)
  const { data } = useGetSingleBookQuery(bookId);
  const [deleteBook] = useDeleteBookMutation();
  const [addToWishlist] = useAddToWishlistMutation()
  const [addToPlannedList] = useAddToPlannedMutation()
  const [updatePlannedList] = useUpdatePlannedListMutation()

  const navigate = useNavigate();

  const deleteHandler = () => deleteBook({ id: bookId! });

  return (
    <div>
      Book details
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <button
          type="button"
          onClick={() => addToWishlist({id: user.id, data: {
            bookId: bookId! 
        }})}
        >
          Add to Wishlist
        </button>
        <button
          type="button"
          onClick={() => addToPlannedList({id: user.id, data: {
            bookId: bookId! 
        }})}
        >
          Add to reading list
        </button>
        <button
          type="button"
          onClick={() => navigate(`${config.routes.books.index}/${bookId}/edit`)}
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
        <div key={review?.comment}>
          <b>User: {review.user?.email}</b>
          <small>{review?.comment}</small>
          <hr />
        </div>
      ))}
      <Review />
    </div>
  );
};

export default BookDetails;
