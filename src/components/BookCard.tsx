import config from '@/config';
import { IBook } from '@/redux/features/book/bookApi';
import { Link } from 'react-router-dom';

type Props = {
  book: IBook;
};

const BookCard = (props: Props) => {
  const { book } = props;

  return (
    <div className="col">
      <div className="card">
        <img src="https://fastly.picsum.photos/id/1020/200/100.jpg?hmac=TOo4vG62dc00NB8dVIDyDobU2rXA__rbFish69KblNY" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text">Author: {book.author}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Genre: {book.genre}</li>
          <li className="list-group-item">
            Published On: {book.publicationDate}
          </li>
        </ul>
        <div className="card-body">
          <Link
            to={`${config.routes.books.index}/${book.id}`}
            className="card-link"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
