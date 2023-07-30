import React, { Fragment } from "react";
import Header from "../components/header/Header";
import NotificationSkeleton from "@/app/components/loading/NotificationSkeleton";

const loading = () => {
  return (
    <Fragment>
      <Header label="Notifications" showBackArrow />
      <NotificationSkeleton count={3} />
    </Fragment>
  );
};

export default loading;
