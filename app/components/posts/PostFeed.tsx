"use client";
import usePosts from "@/hooks/usePosts";
import React, { Fragment } from "react";
import PostItem from "@/app/components/posts/PostItem";
import LoadingSkeleton from "@/app/components/loading/LoadingSkeleton";

interface PostFeedProps {
  userId?: string;
}
const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [], isLoading } = usePosts(userId);

  if (isLoading || !posts) {
    return <LoadingSkeleton count={3} />;
  }

  return (
    <Fragment>
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </Fragment>
  );
};

export default PostFeed;
