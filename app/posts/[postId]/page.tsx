"use client";
import Form from "@/app/components/form/Form";
import Header from "@/app/components/header/Header";
import Loading from "@/app/components/loading/Loading";
import CommentFeed from "@/app/components/posts/CommentFeed";
import PostItem from "@/app/components/posts/PostItem";

import usePost from "@/hooks/usePost";
import React, { Fragment } from "react";

const PostView = ({ params }: { params: { postId: string } }) => {
  const { postId } = params;

  const { data: fetchedPost, isLoading } = usePost(postId);
  console.log(postId);
  if (isLoading || !fetchedPost) {
    return <Loading />;
  }

  return (
    <Fragment>
      <Header label="Tweet" showBackArrow />
      <PostItem data={fetchedPost} />
      <Form
        placeholder="Tweet your reply"
        isComment
        postId={postId as string}
      />
      <CommentFeed comments={fetchedPost?.comments} />
    </Fragment>
  );
};

export default PostView;
