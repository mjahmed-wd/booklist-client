import BookCard from '@/components/BookCard';
import config from '@/config';
import { useGetAllBooksQuery } from '@/redux/features/book/bookApi';
import { bookGenre } from '@/utils/constant';
import { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type Props = {};

const Books = (props: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const { data, isLoading, refetch } = useGetAllBooksQuery({
    searchTerm: searchValue,
    genre: selectedGenre,
    year: selectedYear,
  });

  if (isLoading) return <h2>Loading. .. ...</h2>;

  return (
    <Container>
      <div className='mt-3 mb-3 d-flex justify-content-center align-items-center gap-2'>
        <input
          type="text"
          name="searchValue"
          id=""
          placeholder="Search"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          className="form-control"
        />
        <select
          name="color"
          className="form-select"
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
        <input
          type="text"
          name="searchValue"
          id=""
          placeholder="Year"
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(e.target.value);
          }}
          className="form-control"
        />
        <Button
          type="button"
          onClick={refetch}
          variant="outline-success"
          className="me-3 w-25"
        >
          Add Books
        </Button>
      </div>
      <div className="row row-cols-1 row-cols-md-4 g-4 card-group">
        {data?.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </Container>
  );
};

export default Books;
