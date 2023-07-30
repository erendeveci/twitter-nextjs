import { Fragment } from "react";
import CommentItem from "@/app/components/posts/CommentItem";

interface CommentFeedProps {
  comments?: Record<string, any>[];
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments = [] }) => {
  return (
    <Fragment>
      {comments.map((comment) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </Fragment>
  );
};

export default CommentFeed