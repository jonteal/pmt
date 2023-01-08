import React from "react";
import AddComment from "../AddComment/AddComment";
import ActivityComment from "../ActivityComment/ActivityComment";

import './activityFeed.css';

const ActivityFeed = ({ projectId, matchingActivityComments }) => {
  const rootClass = "activity-feed";

  return (
    <div className={`${rootClass}-main-container`}>
      <AddComment projectId={projectId} />
      <ul>
        {matchingActivityComments.map((comment) => (
          <li key={comment.id}>
            <ActivityComment key={comment.id} comment={comment} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;
