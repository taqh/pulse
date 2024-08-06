"use client";
import Link from "next/link";
import Image from "next/image";
import shorten from "@/utils/shorten";
import Badge from "../ui/badge";
import { Post } from "@/types";

function PostCard({ title, coverImg, category, dateCreated, id }: Post) {
  return (
    <li className="w-fit rounded-lg">
      <div className="flex h-full flex-col gap-2">
        <div className="group relative h-full overflow-hidden rounded-md">
          <Image
            src={coverImg}
            alt={title}
            className="aspect-video h-auto w-auto rounded-lg object-cover transition-all duration-300 group-hover:scale-105"
            width={300}
            height={250}
          />
        </div>
        <div className="flex h-full max-w-[400px] flex-col justify-between gap-4 px-2 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-sm font-medium">
              <Badge category={category}>{category}</Badge>
              <p>
                {new Date(dateCreated ?? "").toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <Link
              href={`/post/${id}`}
              className="flex w-fit items-center gap-2 rounded-md p-2 font-medium transition-all duration-300 hover:underline focus-visible:underline"
            >
              <p className="font-bold lg:text-lg">{shorten(title, 90)}</p>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default PostCard;
