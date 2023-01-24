import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

// GRAPHQL
import { GET_PROJECTS } from "../../../graphql/queries/projectQueries";
import { GET_ACTIVITY_COMMENTS } from "../../../graphql/queries/activityCommentQueries";
import { DELETE_ACTIVITY_COMMENT } from "../../../graphql/mutations/activityCommentMutations";

import "./activityComment.css";

const ActivityComment = ({ comment }) => {
  const rootClass = "activity-comment";

  const [deleteComment] = useMutation(DELETE_ACTIVITY_COMMENT, {
    variables: { id: comment.id },
    refetchQueries: [
      { query: GET_PROJECTS },
      {
        query: GET_ACTIVITY_COMMENTS,
      },
    ],
  });

  return (
    <div className={`${rootClass}-main-container`}>
      <div className={`${rootClass}-container`}>
        <p className={`${rootClass}-commentText`}>{comment.commentText}</p>
        <p className={`${rootClass}-created-at`}>{comment.createdAt}</p>
      </div>
      <div className="dropdown">
        <button
          className={`dropdown-toggle ${rootClass}-dropdown-item`}
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        ></button>
        <ul className={`dropdown-menu ${rootClass}-dropdown-list`}>
          <li>
            <Link onClick={deleteComment} to="/">
              Delete Update
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ActivityComment;
