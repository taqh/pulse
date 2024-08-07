"use client";
import MaxWidthContainer from "@/components/max-width-container";
import Related from "@/components/related";
import Badge from "@/components/ui/badge";
import { categories } from "@/constants";
import { IRootState } from "@/redux/store";
import shorten from "@/utils/shorten";
import { LinkIcon, Share2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import parse from "html-react-parser";

function Page({ params }: { params: { slug: string } }) {
  const { posts } = useSelector((state: IRootState) => state.posts);
  const { slug } = params;

  const getPost = () => {
    const post = posts.find((post) => post.id === slug);
    return post;
  };

  const post = getPost();
  if (!post) return notFound();

  function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Copied to clipboard", { position: "top-right" });
  }

  return (
    <MaxWidthContainer className="grid lg:grid-cols-3 lg:gap-x-10">
      <div className="lg:col-span-2">
        <article className="mx-auto flex max-w-screen-md flex-col gap-5 lg:py-10">
          <Image
            src={post.coverImg}
            alt={post.title}
            width={768}
            height={400}
            className="aspect-video h-auto w-auto rounded-lg object-contain"
          />
          <section className="space-y-4">
            <div className="flex w-full flex-col items-center justify-center gap-2 py-2">
              <span className="mb-6">{post.excerpt}</span>
              {/* <time
                className="text-sm tracking-tight text-zinc-600"
                dateTime={new Date().toISOString()}
              >
                Published on {new Date().toDateString()}
              </time>
              <span>By</span>
              <div className="flex items-center gap-3">
                <Image
                  src={post.author.image ?? "/placeholder.svg"}
                  alt={""}
                  width={42}
                  height={42}
                  className="h-6 w-6 rounded-full border lg:h-10 lg:w-10"
                />
                <p className="text-sm font-medium lg:text-base">
                  {post.author.name}
                </p>
              </div> */}
            </div>
            <h1 className="text-center text-base font-bold leading-tight md:text-xl lg:text-2xl">
              {post.title}
            </h1>
          </section>

          <section
            className="prose prose-base mt-2 xl:prose-lg lg:mt-4"
            dangerouslySetInnerHTML={{
              __html: post.content ? post.content : "",
            }}
          />
        </article>
        <section className="mx-auto max-w-screen-md space-y-6 py-6 lg:py-10">
          <button
            type="button"
            title="share"
            onClick={() => copyLink()}
            className="flex items-center gap-2 rounded-md border border-input p-2 text-sm transition-all duration-300 hover:border-orange-400 hover:text-orange-400"
          >
            <Share2Icon size={16} />
            <span>Share</span>
          </button>

          {/* <Related
            currentPost={slug}
            authorId={post.author.id.toString()}
            authorName={post.author.name}
          /> */}
        </section>
      </div>
      {/* sidebar */}
      <aside className="sticky top-[100px] h-fit w-full rounded-md border bg-white p-6 shadow-sm">
        <div className="">
          <p className="mb-4 text-center font-semibold text-orange-600 lg:text-lg">
            Featured posts
          </p>
          <ul className="flex flex-col gap-2">
            {posts
              .filter((item) => item.id !== slug)
              .slice(0, 2)
              .map((post) => (
                <li key={post.id} className="p-2">
                  <Link
                    href={post.id}
                    className="group flex items-start gap-2 hover:text-orange-500 hover:underline"
                  >
                    <div className="shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={post.coverImg}
                        alt={post.title}
                        width={80}
                        height={80}
                        className="aspect-auto rounded-md object-contain transition duration-300 group-hover:scale-105"
                      />
                    </div>
                    <p className="text-sm">
                      {parse(shorten(post.excerpt, 150))}
                    </p>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </aside>
    </MaxWidthContainer>
  );
}

export default Page;
