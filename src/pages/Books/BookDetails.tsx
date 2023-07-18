import AddReview from '@/components/AddReview';
import Review from '@/components/Review';
import config from '@/config';
import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
} from '@/redux/features/book/bookApi';
import {
  useAddToPlannedMutation,
  useAddToWishlistMutation,
  useGetUserInfoQuery,
  useUpdatePlannedListMutation,
} from '@/redux/features/user/userApi';
import { useAppSelector } from '@/redux/hook';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {};

const BookDetails = (props: Props) => {
  const { id: bookId } = useParams();
  const user = useAppSelector((state) => state.user);
  const { data } = useGetSingleBookQuery(bookId);
  const [deleteBook] = useDeleteBookMutation();
  const [addToWishlist] = useAddToWishlistMutation();
  const [addToPlannedList] = useAddToPlannedMutation();
  const [updatePlannedList] = useUpdatePlannedListMutation();

  const navigate = useNavigate();

  const deleteHandler = () => deleteBook({ id: bookId! });

  return (
    <Container>
      Book details
      <div className="card-group">
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Book: {data?.title}</h5>
            <p className="card-text">Author: {data?.author}</p>
            <p className="card-text">
              <small className="text-muted">Genre: {data?.genre}</small>
            </p>
            <p className="card-text">
              <small className="text-muted">
                Publication: {data?.publicationDate}
              </small>
            </p>
            <br />
            <hr />
            <h5 className="card-title">All Reviews</h5>
            <div className="card-group">
              {data?.reviews?.map((review) => (
                <Review key={review?.comment} review={review} />
              ))}
            </div>
            <br />
            <hr />
            <h5 className="card-title">Add Your Review</h5>
            <AddReview />
          </div>
        </div>
        {/* <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <button
            type="button"
            onClick={() =>
              addToWishlist({
                id: user.id,
                data: {
                  bookId: bookId!,
                },
              })
            }
          >
            Add to Wishlist
          </button>
          <button
            type="button"
            onClick={() =>
              addToPlannedList({
                id: user.id,
                data: {
                  bookId: bookId!,
                },
              })
            }
          >
            Add to reading list
          </button>
          <button
            type="button"
            onClick={() =>
              navigate(`${config.routes.books.index}/${bookId}/edit`)
            }
          >
            Edit
          </button>
          <button type="button" onClick={deleteHandler}>
            Delete
          </button>
        </div> */}
        {/* <h1>{data?.title}</h1>
        <p>Author: {data?.author}</p>
        <p>Genre: {data?.genre}</p>
        <p>Publication: {data?.publicationDate}</p> */}
      </div>
    </Container>
  );
};

export default BookDetails;
