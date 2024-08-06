import React from "react";
import dynamic from "next/dynamic";

const EditBlog = dynamic(
  () => {
    return import("./editBlog");
  },
  { ssr: false },
);
const Page = () => {
  return <EditBlog />;
};

export default Page;
