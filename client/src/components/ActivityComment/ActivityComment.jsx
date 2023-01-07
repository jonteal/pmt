
import './activityComment.css';

const ActivityComment = ({ comment }) => {
  return (
    <div className='activity-comment-container'>
      <p>{comment.commentText}</p>
      <p>{comment.createdAt}</p>
      <p>{comment.project.title}</p>
    </div>
  )
}

export default ActivityComment;