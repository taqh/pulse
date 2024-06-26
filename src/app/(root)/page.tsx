"use client";
import PostCard from "@/components/cards/post-card";
import MaxWidthContainer from "@/components/max-width-container";
import { categories, posts } from "@/constants";
import shorten from "@/utils/shorten";
import { ArrowRight, Flame, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [postsToShow, setPostsToShow] = useState(posts);
  const searchParams = useSearchParams();

  function selectCategory(category: string) {
    router.push(`/?cat=${category}`, { scroll: false });
  }

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
            <article className="relative z-10 pt-24 lg:pt-32 xl:pt-60">
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
      <section className="py-10">
        <MaxWidthContainer className="relative mt-20">
          <div className="grid gap-14 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ul className="grid grid-cols-[repeat(auto-fill,_minmax(19rem,_1fr))] justify-center gap-8 md:gap-12 lg:col-span-2 lg:gap-16">
                {postsToShow.map((post) => (
                  <PostCard key={post.id} {...post} />
                ))}
              </ul>
              {!postsToShow.length && (
                <div className="flex flex-col items-center justify-center gap-4 lg:col-span-1 lg:gap-6">
                  <h2 className="text-center text-2xl font-semibold lg:text-3xl">
                    No posts found
                  </h2>
                  <p className="text-center text-gray-700 lg:text-lg">
                    There are no posts available in this category.
                  </p>
                </div>
              )}
            </div>

            <aside className="sticky top-[70px] h-fit w-full rounded-md border bg-white p-6 shadow-sm">
              <div className="">
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
                        className={`relative block w-full rounded-md border-accent px-6 py-2.5 text-left text-black transition-colors duration-500 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:origin-left after:scale-x-0 after:bg-fuchsia-400 after:transition after:duration-500 hover:after:scale-x-100`}
                      >
                        <span className="relative z-10 text-sm capitalize tracking-widest">
                          {category.name}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </MaxWidthContainer>
      </section>
    </div>
  );
}
