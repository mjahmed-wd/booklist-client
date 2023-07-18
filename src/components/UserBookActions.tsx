import config from '@/config';
import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
} from '@/redux/features/book/bookApi';
import {
  useAddToPlannedMutation,
  useAddToWishlistMutation,
  useUpdatePlannedListMutation,
} from '@/redux/features/user/userApi';
import { useAppSelector } from '@/redux/hook';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {};

const UserBookActions = (props: Props) => {
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
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
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
