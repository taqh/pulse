"use client";
import MaxWidthContainer from "@/components/max-width-container";
import React from "react";
import { toast } from "react-toastify";

function Page() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData);
    toast.success("Success");
  };

  return (
    <MaxWidthContainer className="py-14">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-md flex-col gap-5 rounded-md border bg-white px-6 py-10 shadow-sm"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="block text-sm font-semibold capitalize"
          >
            Name
          </label>
          <input
            name="name"
            id="name"
            type="text"
            placeholder="John Doe"
            className="w-full rounded-md border p-2 placeholder:text-sm placeholder:font-thin placeholder:text-gray-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="block text-sm font-semibold capitalize"
          >
            Email
          </label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="johndoe@mail.com"
            className="w-full rounded-md border p-2 placeholder:text-sm placeholder:font-thin placeholder:text-gray-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="block text-sm font-semibold capitalize"
          >
            Password
          </label>
          <input
            name="password"
            id="password"
            className="w-full resize-none rounded-md border p-2 placeholder:text-sm placeholder:font-thin placeholder:text-gray-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-fit rounded-md bg-orange-600 p-3 text-white transition duration-300 hover:bg-orange-600/90"
        >
          Submit
        </button>
        <div className="flex items-center my-4">
          <span className="h-px w-full bg-gray-200" />
          <span className="mx-3 text-gray-600">OR</span>
          <span className="h-px w-full bg-gray-200" />
        </div>
        <div>
          <button
            onClick={() => console.log("clicked")}
            className="w-full rounded-md border-2 border-orange-400 p-3 transition duration-300 hover:bg-orange-100"
          >
            Continue with Google
          </button>
        </div>
      </form>
    </MaxWidthContainer>
  );
}

export default Page;
