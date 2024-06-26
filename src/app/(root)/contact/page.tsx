'use client';
import MaxWidthContainer from "@/components/max-width-container";
import { SendHorizonal } from "lucide-react";
import { toast } from "react-toastify";

function Page() {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    toast.success("Message sent successfully", { position: "top-right" });
  }

  return (
    <MaxWidthContainer className="space-y-10 py-14">
      <div>
        <p className="text-center text-gray-600 lg:text-lg">
          Shoot us a message and we&apos;ll get back to you as soon as possible.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-5 rounded-md border bg-white px-6 py-10 shadow-sm">
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
            className="w-full rounded-md border p-2 placeholder:text-sm placeholder:font-thin placeholder:text-gray-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="message"
            className="block text-sm font-semibold capitalize"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            className="w-full resize-none rounded-md border p-2 placeholder:text-sm placeholder:font-thin placeholder:text-gray-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            rows={6}
          />
        </div>
        <button
          type="submit"
          className="w-fit mt-4 flex items-center gap-2 rounded-md hover:bg-orange-600/90 bg-orange-600 px-3 py-2 text-white transition duration-300"
        >
          Send <SendHorizonal size={16} />
        </button>
      </form>
    </MaxWidthContainer>
  );
}

export default Page;
