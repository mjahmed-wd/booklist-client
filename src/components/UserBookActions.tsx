import config from '@/config';
import {
  useDeleteBookMutation
} from '@/redux/features/book/bookApi';
import {
  useAddToPlannedMutation,
  useAddToWishlistMutation,
  useUpdatePlannedListMutation,
} from '@/redux/features/user/userApi';
import { useAppSelector } from '@/redux/hook';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const UserBookActions = () => {
  const { id: bookId } = useParams();
  const user = useAppSelector((state) => state.user);
  const [deleteBook] = useDeleteBookMutation();
  const [addToWishlist] = useAddToWishlistMutation();
  const [addToPlannedList] = useAddToPlannedMutation();
  const [updatePlannedList] = useUpdatePlannedListMutation();

  const navigate = useNavigate();

  const deleteHandler = () => deleteBook({ id: bookId! });

  const isExistingOnPlannedList = () => {
    const foundBook = user.plannedToRead.find((book) => book.book === bookId);
    if (foundBook && foundBook.isFinished) {
      return 'Finished';
    } else if (foundBook) {
      return 'Listed';
    } else {
      return 'NotListed';
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      {user.wishlist.includes(bookId!) ? (
        <Button
          type="button"
          variant="outline-success"
          className="me-3"
          disabled
        >
          Wishlist added
        </Button>
      ) : (
        <Button
          type="button"
          variant="outline-success"
          className="me-3"
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
        </Button>
      )}
      {isExistingOnPlannedList() === 'Listed' ? (
        <Button
          type="button"
          variant="outline-success"
          className="me-3"
          onClick={() =>
            updatePlannedList({
              id: user.id,
              data: {
                bookId: bookId!,
              },
            })
          }
        >
          Mark as Read
        </Button>
      ) : isExistingOnPlannedList() === 'NotListed' ? (
        <Button
          type="button"
          variant="outline-success"
          className="me-3"
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
        </Button>
      ) : (
        <Button
          type="button"
          variant="outline-success"
          className="me-3"
          disabled
        >
          Already Read
        </Button>
      )}

      <Button
        type="button"
        variant="outline-success"
        className="me-3"
        onClick={() => navigate(`${config.routes.books.index}/${bookId}/edit`)}
      >
        Edit
      </Button>
      <Button
        type="button"
        variant="outline-danger"
        className="me-3"
        onClick={deleteHandler}
      >
        Delete
      </Button>
    </div>
  );
};

export default UserBookActions;
