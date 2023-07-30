import React, { Fragment } from "react";
import Header from "@/app/components/header/Header";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/libs/authOptions";
import NotificationsFeed from "@/app/components/notifications/NotificationsFeed";

const Notifications = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  return (
    <Fragment>
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed />
    </Fragment>
  );
};

export default Notifications;
