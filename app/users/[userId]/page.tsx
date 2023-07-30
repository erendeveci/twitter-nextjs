"use client";
import Header from "@/app/components/header/Header";
import UserHero from "@/app/components/users/UserHero";

import React, { Fragment } from "react";
import useUser from "@/hooks/useUser";

import { ClipLoader } from "react-spinners";
import UserBio from "@/app/components/users/UserBio";
import PostFeed from "@/app/components/posts/PostFeed";

const UserView = ({ params }: { params: { userId: string } }) => {
  const { userId } = params;

  const { data: fetchedUser, isLoading } = useUser(userId);

  if (isLoading || !fetchedUser) {
    return (
      <div
        className="
        flex
        justify-center
        items-center
        h-full"
      >
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <Fragment>
      <Header showBackArrow label={fetchedUser.name} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed userId={userId as string} />
    </Fragment>
  );
};

export default UserView;
