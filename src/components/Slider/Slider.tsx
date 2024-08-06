"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { categories, posts } from "@/constants";
import "./style.css";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { useSearchParams } from "next/navigation";
import shorten from "@/utils/shorten";
const SliderPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [postsToShow, setPostsToShow] = useState(posts);
  const searchParams = useSearchParams();
  const handleSlideChange = (swiper: any) => {
    setCurrentSlide(swiper.activeIndex);
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
    <div
      className={`${
        currentSlide === 0
          ? "blur-bg-1"
          : currentSlide === 1
            ? "blur-bg-2"
            : "blur-bg-3"
      } flex w-full h-[80vh] justify-center items-center bg-[#CECECE]`}
    >
      <div className="w-full h-full  bg-center">
        <Swiper
          className="w-full h-full"
          slidesPerView={1}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          onSlideChange={handleSlideChange}
          // navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {" "}
          <SwiperSlide className="w-full h-full">
            <Image
              width={300}
              height={300}
              className="w-full object-contain h-full"
              src={"/slider3.png"}
              alt="img"
              quality={100}
            />
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
          </SwiperSlide>
          <SwiperSlide className="w-full h-full">
            <Image
              height={500}
              width={500}
              src={"/slider1.jpg"}
              alt="img"
              quality={100}
              className="w-full"
              style={{ objectFit: "fill" }}
            />
          </SwiperSlide>
          <SwiperSlide className="w-full h-full">
            <Image
              height={500}
              width={500}
              src={"/slider2.png"}
              alt="img"
              quality={100}
              className="w-full"
              style={{ objectFit: "fill" }}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};
export default SliderPage;
