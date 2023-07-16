import config from '@/config';
import { useGetAllBooksQuery } from '@/redux/features/book/bookApi';
import { bookGenre } from '@/utils/constant';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {};

const Books = (props: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const { data, isLoading, refetch } = useGetAllBooksQuery({
    searchTerm: searchValue,
    genre: selectedGenre,
    publicationYear: undefined,
  });

  if (isLoading) return <h2>Loading. .. ...</h2>;

  return (
    <div>
      <div>
        <input
          type="text"
          name="searchValue"
          id=""
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <select
          name="color"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All</option>
          {bookGenre.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <button type="button" onClick={refetch}>
          Search
        </button>
      </div>
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
