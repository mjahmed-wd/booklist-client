import AddReview from '@/components/AddReview';
import Review from '@/components/Review';
import UserBookActions from '@/components/UserBookActions';
import {
  useGetSingleBookQuery
} from '@/redux/features/book/bookApi';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id: bookId } = useParams();
  const { data } = useGetSingleBookQuery(bookId);

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
            <UserBookActions/>
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
      </div>
    </Container>
  );
};

export default BookDetails;
