import config from '@/config';
import { useGetAllBooksQuery } from '@/redux/features/book/bookApi';
import { Link } from 'react-router-dom';

type Props = {};

const Books = (props: Props) => {
  const { data, isLoading } = useGetAllBooksQuery(undefined);

  if (isLoading) return <h2>Loading. .. ...</h2>;

  return (
    <div>
      {data?.map((book) => (
        <div key={book.id}>
          <Link to={`${config.routes.books.index}/${book.id}`}>
            Book Name: {book.title}
          </Link>
          <p>Author: {book.author}</p>
          <p>Genre: {book.genre}</p>
          <p>Publish Date: {book.publicationDate}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Books;
