import config from '@/config';
import { useGetSingleBookQuery } from '@/redux/features/book/bookApi';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {};

const BookDetails = (props: Props) => {
  const { id } = useParams();
  const { data } = useGetSingleBookQuery(id);

  const navigate = useNavigate();

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
        <button type="button">Delete</button>
      </div>
      <h1>{data?.title}</h1>
      <p>{data?.author}</p>
      <p>{data?.genre}</p>
      <p>{data?.publicationDate}</p>
    </div>
  );
};

export default BookDetails;
