import Image from "next/image";
import Header from "@/app/components/header/Header";
import Form from "@/app/components/form/Form";
import PostFeed from "@/app/components/posts/PostFeed";
import { Fragment } from "react";
export default function Home() {
  return (
    <Fragment>
      <Header label="Home" />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </Fragment>
  );
}
