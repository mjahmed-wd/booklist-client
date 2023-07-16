import { useGetSingleBookQuery } from '@/redux/features/book/bookApi';
import { useParams } from 'react-router-dom';

type Props = {};

const BookDetails = (props: Props) => {
  const { id } = useParams();
  const { data } = useGetSingleBookQuery(id);

  return (
    <div>
      Book details
      <h1>{data?.title}</h1>
      <p>{data?.author}</p>
      <p>{data?.genre}</p>
      <p>{data?.publicationDate}</p>
    </div>
  );
};

export default BookDetails;
