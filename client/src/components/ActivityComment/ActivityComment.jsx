
import './activityComment.css';

const ActivityComment = ({ comment }) => {
  const rootClass = 'activity-comment';
  return (
    <div className={`${rootClass}-container`}>
      <p className={`${rootClass}-commentText`}>{comment.commentText}</p>
      <p className={`${rootClass}-created-at`}>{comment.createdAt}</p>
    </div>
  )
}

export default ActivityComment;