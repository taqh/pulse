"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Circles } from "react-loader-spinner";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { LOGIN } from "@/utils/createPost";
import { db } from "@/firebase";
import { getPosts } from "@/utils/getBlogs";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { loadPosts, unloadPosts } from "@/redux/posts/postSlice";
import { Post } from "@/types";
import MaxWidthContainer from "@/components/max-width-container";
const Admin = () => {
  const { posts } = useSelector((state: IRootState) => state.posts);
  const notify = (arg: any) => toast(arg);
  const [loading, setLoading] = useState(true);
  const [_posts, setPosts] = useState<any>([]);
  const dispatch = useDispatch();
  const Router = useRouter();
  const isLogged = true;

  const getPromptForDelete = async (id: string) => {
    const username = prompt("Enter username");
    const password = prompt("Enter password");
    if (username === LOGIN.NAME && password === LOGIN.PASSWORD) {
      setLoading(true);
      const postToDelete = doc(db, "posts", id);
      await deleteDoc(postToDelete);
      dispatch(unloadPosts());
      window.location.reload();
      setLoading(false);
    } else {
      notify("Incorrect Credentials");
      setLoading(false);
    }
  };

  const getPromptForEdit = async (id: string) => {
    // const username = prompt("Enter username");
    // const password = prompt("Enter password");

    // if (username === LOGIN.NAME && password === LOGIN.PASSWORD) {
    Router.push(`/editBlog/?id=${id}`);
    // } else {
    //   notify("Incorrect Credentials");
    // }
  };

  const getAllPosts = async () => {
    setLoading(true);
    const res = await getPosts();
    setPosts(res);
    dispatch(loadPosts(res as Post[]));
    setLoading(false);
  };

  // const searchFunctionality = (value) => {
  //   if (!value || value === "") {
  //     setPosts(posts);
  //   }
  //   if (unfilteredPosts.length > 0) {
  //     const searched = unfilteredPosts.filter((post) =>
  //       post.title.toLowerCase().includes(value.toLowerCase())
  //     );
  //     setPosts(searched);
  //   }
  // };

  useEffect(() => {
    if (posts.length === 0) {
      getAllPosts();
    } else {
      setPosts(posts);
      setLoading(false);
    }
  }, [posts]);
  return (
    <MaxWidthContainer className="relative flex flex-col p-5">
      <ToastContainer />

      {loading ? (
        <div className="flex h-[70vh] items-center justify-center">
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <>
          <div>
            {/* BELOW IS POST SEARCH FUNCTIONALITY */}
            {/* <label htmlFor='search' className='flex justify-center my-4 items-center gap-1'>
              <input
                type='text'
                id='search'
                placeholder='Type something here...'
                className='shadow-md p-2.5 border border-transparent outline-none rounded-md focus:border-LightBlue'
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
              <button
                className='rounded-md text-white border-0 outline-transparent cursor-pointer bg-LightBlue p-3 shadow-md'
                onClick={() => searchFunctionality(searchTerm)}
              >
                Search
              </button>
            </label> */}

            <h1 className="text-DarkGray-Blue mb-4 text-center text-2xl font-extrabold">
              Your Blog Posts
            </h1>
            {isLogged && (
              <button
                className="customBtn self-end ml-auto"
                onClick={() => Router.push("/createBlog")}
              >
                NEW POST
              </button>
            )}
          </div>
          <div className="my-10 flex flex-wrap gap-10">
            {_posts.length > 0 ? (
              _posts.map((post: any) => (
                <div
                  key={post.id}
                  className="bg-PaleBlue flex w-full max-w-[20rem] flex-col items-center justify-center rounded-lg border-2 p-5 shadow-md"
                >
                  <h1 className="text-xl font-bold">
                    {post.title.length > 25
                      ? `${post.title.slice(0, 25)}....`
                      : post.title}
                  </h1>
                  <Image
                    width={100}
                    height={100}
                    src={post.coverImg}
                    alt="cover_image"
                    className="my-1 w-[40%]"
                  />
                  <span className="mb-1 block text-sm">
                    {post.excerpt.length > 40
                      ? `${post.excerpt.slice(0, 40)}....`
                      : post.excerpt}
                  </span>
                  <div className="mt-8 flex w-full">
                    {" "}
                    <div className="flex w-full justify-between">
                      <span
                        onClick={() => {
                          Router.push(`/BlogDetails/?id=${post.id}`);
                        }}
                        className="cursor-pointer text-sm text-[#4f46e5]"
                      >
                        Read More
                      </span>
                    </div>
                    <div className="flex w-full justify-between">
                      <span
                        // href={`/${post.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          getPromptForEdit(post.id);
                        }}
                        className="cursor-pointer text-sm text-[#e546a5]"
                      >
                        Edit
                      </span>
                    </div>
                    <div className="flex w-full justify-between">
                      <span
                        onClick={() => getPromptForDelete(post.id)}
                        className="cursor-pointer text-sm font-semibold text-[#e54646]"
                      >
                        Delete
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex w-[80vw] flex-col">
                <h1 className="text-gray-600">Oops no posts yet</h1>
              </div>
            )}
          </div>
        </>
      )}
    </MaxWidthContainer>
  );
};

export default Admin;
