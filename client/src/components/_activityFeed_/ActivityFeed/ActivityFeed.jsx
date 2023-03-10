// COMPONENTS
import AddComment from "../AddComment/AddComment";
import ActivityComment from "../ActivityComment/ActivityComment";

import "./activityFeed.css";

const rootClass = "activity-feed";

const ActivityFeed = ({ projectId, matchingActivityComments }) => {

  return (
    <div className={`${rootClass}-main-container`}>
      <div className={`${rootClass}-inner-container`}>
        <AddComment projectId={projectId} />
        <ul className={`${rootClass}-comment-list`}>
          {matchingActivityComments.map((comment) => (
            <li key={comment.id}>
              <ActivityComment key={comment.id} comment={comment} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActivityFeed;
