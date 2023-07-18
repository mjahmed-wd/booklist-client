import { IUserState } from '@/redux/features/user/userSlice';

type Props = {
  review: {
    user: IUserState;
    comment: string;
  };
};

const Review = (props: Props) => {
  const { review } = props;

  return (
    <div className="card border-light mb-3">
      <div className="card-header">User: {review.user?.email}</div>
      <div className="card-body">
        <p className="card-text">{review?.comment}</p>
      </div>
    </div>
  );
};

export default Review;
