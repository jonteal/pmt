import { useState } from "react";
import { useMutation } from "@apollo/client";

// GRAPHQL
import { ADD_ACTIVITY_COMMENT } from "../../../graphql/mutations/activityCommentMutations";
import { GET_ACTIVITY_COMMENTS } from "../../../graphql/queries/activityCommentQueries";

// COMPONENTS
import Button from "../../Button/Button";

import "./addComment.css";

const AddComment = ({ projectId }) => {
  const rootClass = "add-comment";

  const [commentText, setCommentText] = useState("");

  const [addActivityComment] = useMutation(ADD_ACTIVITY_COMMENT, {
    variables: { commentText, projectId },
    update(cache, { data: { addActivityComment } }) {
      const { activityComments } = cache.readQuery({
        query: GET_ACTIVITY_COMMENTS,
      });
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
    <div className={`${rootClass}-main-container`}>
      <form className={`${rootClass}-form`} onSubmit={onSubmit}>
        <label className="form-label">Activity Feed</label>
        <input
          type="text"
          placeholder="Post an update..."
          onChange={(e) => setCommentText(e.target.value)}
          value={commentText}
          className={`${rootClass}-input`}
          id="activityComment"
        />
        <Button type="submit" buttonType="submit">
          Post
        </Button>
      </form>
    </div>
  );
};

export default AddComment;
