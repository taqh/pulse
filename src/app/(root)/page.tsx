"use client";
import PostCard from "@/components/cards/post-card";
import MaxWidthContainer from "@/components/max-width-container";
import { categories, posts } from "@/constants";
import shorten from "@/utils/shorten";
import {
  ArrowRight,
  Flame,
  ImageIcon,
  Radio,
  SlidersHorizontal,
  Sparkles,
  Loader,
  ArrowLeft,
  ListFilter,
  Eye,
  MessageCircle,
  VideoIcon,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [postsToShow, setPostsToShow] = useState(posts);
  const [loading, setLoading] = useState(false);
  const [postsPerPage, setpostsPerPage] = useState(6);
  const searchParams = useSearchParams();
  const cat = searchParams.get("cat");

  function selectCategory(category: string) {
    router.push(`/?cat=${category}`, { scroll: false });
  }

  function resetFilter() {
    router.push("/", { scroll: false });
  }

  const loadMorePosts = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000))
      .then(() => setpostsPerPage((prev) => prev + 2))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat) {
      const filteredPosts = posts.filter(
        (post) => post.category.toLowerCase() === cat,
      );
      setPostsToShow(filteredPosts);
    } else {
      setPostsToShow(posts);
    }
  }, [searchParams]);

  return (
    <div>
      <section className="py-6">
        <MaxWidthContainer>
          <div
            className="news-hero relative flex flex-col justify-between overflow-hidden rounded-md bg-cover bg-fixed bg-no-repeat after:backdrop-blur-md"
            style={{ backgroundImage: `url(/placeholder.jpg)` }}
          >
            <div className="relative z-10 ml-8 mt-6 flex h-fit w-fit items-center gap-2 rounded-md bg-white px-2 py-1.5 lg:ml-10">
              <p className="text-lg text-sm font-medium text-gray-800">
                Trending
              </p>
              <Flame
                className="h-4 w-4 text-orange-600"
                fill="rgb(234 88 12)"
              />
            </div>
            <article className="relative z-10 pt-36 lg:pt-52 xl:pt-72">
              <div className="flex max-w-[609px] flex-col justify-end max-lg:p-8 lg:ml-[50px] lg:pb-8">
                <h1 className="mb-3 text-xl font-bold text-white md:text-2xl lg:text-4xl">
                  {posts[0].title}
                </h1>
                <p className="mb-6 max-w-[575px] text-white max-sm:hidden md:text-lg lg:text-2xl">
                  {shorten(posts[0].content, 60)}
                </p>
                <Link
                  href={`/post/${posts[0]?.slug}`}
                  className="focus-visible:outline-main flex w-fit min-w-[8rem] items-center justify-center gap-2 rounded-md bg-white p-2 font-semibold text-gray-900 outline-1 outline-offset-1 transition-all duration-300 hover:gap-4 focus-visible:gap-4 focus-visible:outline-dashed"
                >
                  Read
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          </div>
        </MaxWidthContainer>
      </section>

      {/* posts section */}
      <section className="lg:py-10">
        <MaxWidthContainer className="relative mt-20">
          <div className="grid gap-6 lg:gap-14 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="relative z-10 mb-6 flex h-fit w-fit items-center gap-2 rounded-md border border-orange-200 bg-white px-8 py-3 shadow-sm lg:mb-10">
                <p className="flex items-center gap-3">
                  <ListFilter className="h-5 w-5 text-orange-600" />
                  <span className="font-medium capitalize text-gray-800 lg:text-lg">
                    {`${cat ? cat : "latest"} posts`}
                  </span>
                </p>
              </div>
              <ul className="grid grid-cols-[repeat(auto-fill,_minmax(19rem,_1fr))] justify-center gap-8 md:gap-12 lg:col-span-2 lg:gap-16">
                {postsToShow.slice(0, postsPerPage).map((post) => (
                  <PostCard key={post.id} {...post} />
                ))}
              </ul>
              {postsToShow.length > postsPerPage && (
                <button
                  type="button"
                  onClick={loadMorePosts}
                  disabled={loading}
                  className="mx-auto my-8 flex w-fit items-center gap-3 rounded-md bg-orange-600 px-4 py-2.5 text-white disabled:opacity-70"
                >
                  {loading && (
                    <Loader className="h-4 w-4 animate-spin transition" />
                  )}
                  {loading ? "Loading..." : "Load more"}
                </button>
              )}

              {!postsToShow.length && (
                <div className="flex flex-col items-center justify-center gap-4 lg:col-span-1 lg:gap-6">
                  <h2 className="text-center text-2xl font-semibold lg:text-3xl">
                    No posts found
                  </h2>
                  <p className="text-center text-gray-700 lg:text-lg">
                    There are no posts available in this category.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilter}
                    className="mt-4 flex w-fit items-center gap-2 rounded-md bg-orange-600 px-3 py-2 text-white transition duration-300 hover:bg-orange-600/90"
                  >
                    <ArrowLeft size={16} />
                    Back to all posts
                  </button>
                </div>
              )}
            </div>

            <aside className="relative h-full w-full space-y-6 lg:px-6">
              {/* categories list */}
              <div className="rounded-md border bg-white p-6 shadow-sm">
                <p className="mb-4 flex items-center gap-2 text-center font-semibold lg:text-lg">
                  <SlidersHorizontal size={16} className="text-orange-600" />
                  Categories
                </p>
                <ul className="flex flex-col gap-2">
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      className={`relative border after:absolute after:left-0 after:top-0 after:h-full after:w-0.5 after:bg-fuchsia-400`}
                    >
                      <button
                        onClick={() => selectCategory(category.slug)}
                        className={`border-accent relative block w-full rounded-md px-6 py-2 text-left text-black transition-colors duration-500 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:origin-left after:scale-x-0 after:bg-fuchsia-400 after:transition after:duration-500 hover:after:scale-x-100`}
                      >
                        <span className="relative z-10 text-sm capitalize tracking-widest">
                          {category.name}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* featured post list */}
              <div className="rounded-md border bg-white p-6 shadow-sm">
                <p className="mb-4 flex items-center gap-2 text-center font-semibold lg:text-lg">
                  <Sparkles size={16} className="text-orange-600" />
                  Featured posts
                </p>
                <ul className="flex flex-col gap-2">
                  {posts.slice(0, 2).map((post) => (
                    <li key={post.id} className="p-2">
                      <Link
                        href={post.slug}
                        className="group flex items-start gap-2 hover:text-orange-500 hover:underline"
                      >
                        <div className="h-full w-full overflow-hidden rounded-md">
                          <Image
                            src="/placeholder.jpg"
                            alt={post.title}
                            width={110}
                            height={90}
                            className="aspect-video h-auto w-auto rounded-md transition duration-300 group-hover:scale-105"
                          />
                        </div>
                        <p className="text-sm">{shorten(post.title, 90)}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* advertisement */}
              <div className="sticky top-[100px] rounded-md border bg-white p-6 shadow-sm">
                <p className="mb-4 flex items-center gap-2 text-center font-semibold lg:text-lg">
                  <Radio size={16} className="text-orange-600" />
                  Advertisement
                </p>
                <div className="flex items-center justify-center p-4">
                  <ImageIcon className="h-20 w-20 text-gray-300" />
                </div>
              </div>
            </aside>
          </div>
        </MaxWidthContainer>
      </section>

      {/* showcase section */}
      <section className="bg-slate-50">
        <MaxWidthContainer className="relative mt-20 py-8 lg:py-16 xl:py-24">
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] justify-center gap-8 md:gap-12 lg:col-span-2 lg:gap-16">
            {/* most popular */}

            <div className="rounded-md border bg-white p-6 shadow-sm">
              <p className="mb-4 gap-2 border-b pb-4 text-center font-semibold lg:text-lg">
                Most Popular
              </p>
              <ul className="flex flex-col gap-2">
                {posts.slice(0, 2).map((post) => (
                  <li key={post.id} className="flex items-start gap-4 p-2">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="group flex items-start"
                    >
                      <div className="h-full w-full overflow-hidden rounded-md">
                        <Image
                          src="/placeholder.jpg"
                          alt={post.title}
                          width={110}
                          height={90}
                          className="aspect-video h-auto w-auto rounded-md transition duration-300 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/posts/${post.slug}`}
                        className="hover:underline"
                      >
                        <p className="text-sm">{shorten(post.title, 90)}</p>
                      </Link>
                      <p className="flex items-center gap-1 text-xs">
                        <Eye size={12} />
                        <span>8000 views</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Talked about */}
            <div className="rounded-md border bg-white p-6 shadow-sm">
              <p className="mb-4 gap-2 border-b pb-4 text-center font-semibold lg:text-lg">
                Talked about
              </p>
              <ul className="flex flex-col gap-2">
                {posts.slice(0, 2).map((post) => (
                  <li key={post.id} className="flex items-start gap-4 p-2">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="group flex items-start"
                    >
                      <div className="h-full w-full overflow-hidden rounded-md">
                        <Image
                          src="/placeholder.jpg"
                          alt={post.title}
                          width={110}
                          height={90}
                          className="aspect-video w-full rounded-md transition duration-300 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/posts/${post.slug}`}
                        className="hover:underline"
                      >
                        <p className="text-sm">{shorten(post.title, 90)}</p>
                      </Link>
                      <p className="flex items-center gap-1 text-xs">
                        <MessageCircle size={12} />
                        <span>80 Comments</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-md border bg-white p-6 shadow-sm">
                <p className="mb-4 gap-2 border-b pb-4 text-center font-semibold lg:text-lg">
                  Video of the day
                </p>
                <div className="flex items-center justify-center p-4">
                  <VideoIcon className="h-20 w-20 text-gray-300" />
                </div>
              </div>
              <div className="rounded-md border bg-white p-6 shadow-sm">
                <p className="mb-4 gap-2 pb-2 text-center font-semibold lg:text-lg">
                  Join us
                </p>
                <ul className="flex flex-wrap items-center justify-between gap-2">
                  <Link
                    href="#"
                    className="rounded-md border p-2 text-sm transition-all duration-300 hover:border-orange-400 hover:text-orange-400"
                  >
                    <Facebook />
                  </Link>
                  <Link
                    href="#"
                    className="rounded-md border p-2 text-sm transition-all duration-300 hover:border-orange-400 hover:text-orange-400"
                  >
                    <Twitter />
                  </Link>
                  <Link
                    href="#"
                    className="rounded-md border p-2 text-sm transition-all duration-300 hover:border-orange-400 hover:text-orange-400"
                  >
                    <Instagram />
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </MaxWidthContainer>
      </section>
    </div>
  );
}
