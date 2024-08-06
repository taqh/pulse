import React from "react";
import dynamic from "next/dynamic";

const CreateBlog = dynamic(
  () => {
    return import("./createBlog");
  },
  { ssr: false },
);
const Page = () => {
  return <CreateBlog />;
};

export default Page;
