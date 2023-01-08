import { useState } from 'react'
import { useMutation } from '@apollo/client';
import { ADD_ACTIVITY_COMMENT } from '../../graphql/mutations/activityCommentMutations';
import { GET_ACTIVITY_COMMENTS } from '../../graphql/queries/activityCommentQueries';

const AddComment = ({ projectId }) => {
  const [commentText, setCommentText] = useState("");

  const [ addActivityComment ] = useMutation(ADD_ACTIVITY_COMMENT, {
    variables: { commentText, projectId },
    update(cache, { data: { addActivityComment } }) {
      const { activityComments } = cache.readQuery({ query: GET_ACTIVITY_COMMENTS });
      cache.writeQuery({
        query: GET_ACTIVITY_COMMENTS,
        data: { activityComments: [...activityComments, addActivityComment] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (commentText === "") {
      return alert("Please add something to the input field");
    }

    addActivityComment(commentText, projectId);

    setCommentText("");
  };

  return (
    <div>
    <form onSubmit={onSubmit}>
      <label className="form-label">Activity Feed</label>
      <input 
        type="text" 
        placeholder='Post an update...'
        onChange={(e) => setCommentText(e.target.value)}
        value={commentText}
        className="form-control"
        id='activityComment'
      />
    </form>
    </div>
  )
}

export default AddComment;