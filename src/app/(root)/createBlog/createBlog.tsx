"use client";
import "../editorStyle.css";
import { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useRouter } from "next/navigation";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import Image from "next/image";
import dotenv from "dotenv";
import Login from "@/components/Login";
import { createPost, LOGIN } from "@/utils/createPost";

const CreateBlog = () => {
  dotenv.config();
  const navigate = useRouter();
  const [saveBlog, setSaveBlog] = useState("Save");
  const [saveLoading, setSaveLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [postContentValue, setPostContentValue] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<any>("News");
  const [excerpt, setExcerpt] = useState("");
  const [coverImg, setCoverImg] = useState<any>("");
  const [status, setStatus] = useState("draft");
  const [error, setError] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const notify = (arg: any) => toast(arg);

  const handleChange = async (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        setCoverImg(reader.result);
      }
    };
  };

  const handleSave = async () => {
    setSaveLoading(true);
    setError("");
    setSaveBlog("Saving...");
    console.log(title, category, excerpt, postContentValue, coverImg, status);
    const response = await createPost(
      title,
      category,
      excerpt,
      postContentValue,
      coverImg,
      status,
    ).catch((e) => {
      setError("Image too large");
    });

    if (response === "success") {
      setSaveLoading(false);
      setSaveBlog("Saved!");
      notify("BLOG CREATED");
      setTimeout(() => {
        navigate.push("/admin");
      }, 3000);
    }
  };

  const getPrompt = () => {
    if (username === LOGIN.NAME && password === LOGIN.PASSWORD) {
      setIsAuth(true);
    } else {
      notify("Incorrect Credentials");
    }
  };

  return (
    <div className="mb-20 flex flex-col items-center">
      <ToastContainer />
      {isAuth ? (
        <>
          <h1 className="text-3xl font-bold">New Post</h1>
          <div className="h-full w-[90%]">
            <form method="POST" className="flex h-full flex-col">
              <span style={{ fontWeight: "700" }}>Post Cover Image</span>
              {coverImg && (
                <Image
                  width={100}
                  height={100}
                  src={coverImg}
                  alt="cover_img_preview"
                  id="cover_image_preview"
                  style={{ width: "10%" }}
                />
              )}
              <input
                className="w-full"
                id="file_input"
                type="file"
                accept="image/*"
                onChange={(e: any) => handleChange(e.target.files[0])}
              />
              <span>Title</span>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-10 h-[3rem] border-2 p-2"
              />
              <span>Excerpt</span>
              <input
                type="text"
                name="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="mb-10 h-[3rem] border-2 p-2"
              />

              <h1>Content</h1>
              <ReactQuill
                theme="snow"
                value={postContentValue}
                onChange={setPostContentValue}
                className="mb-20 h-[25rem] bg-white"
                modules={{
                  toolbar: {
                    container: [
                      [{ header: [1, 2, 3, 4, 5, 6, false] }],
                      ["bold", "italic", "underline", "strike", "code"],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                      ["image", "link", "code-block"],
                      [
                        {
                          color: [
                            "#000000",
                            "#e60000",
                            "#ff9900",
                            "#ffff00",
                            "#008a00",
                            "#0066cc",
                            "#9933ff",
                            "#ffffff",
                            "#facccc",
                            "#ffebcc",
                            "#ffffcc",
                            "#cce8cc",
                            "#cce0f5",
                            "#ebd6ff",
                            "#bbbbbb",
                            "#f06666",
                            "#ffc266",
                            "#ffff66",
                            "#66b966",
                            "#66a3e0",
                            "#c285ff",
                            "#888888",
                            "#a10000",
                            "#b26b00",
                            "#b2b200",
                            "#006100",
                            "#0047b2",
                            "#6b24b2",
                            "#444444",
                            "#5c0000",
                            "#663d00",
                            "#666600",
                            "#003700",
                            "#002966",
                            "#3d1466",
                          ],
                        },
                      ],
                    ],
                    // handlers: {
                    //   image: this.imageHandler,
                    // },
                  },
                }}
              />
              <h1>Category</h1>
              <select
                onChange={(e: any) => {
                  setCategory(e.target.value);
                }}
                className="mb-10 h-[3rem] border-2 p-2"
              >
                <option value={"News"}>News</option>
                <option value={"Comedy"}>Comedy</option>
                <option value={"Movies"}>Movies</option>
                <option value={"Lifestyle"}>Lifestyle</option>
                <option value={"Music"}>Music</option>
              </select>
              <h1>Status</h1>
              <select
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                className="mb-10 h-[3rem] border-2 p-2"
              >
                <option value="draft">draft</option>
                <option value="publish">publish</option>
              </select>

              <span className="text-[orangered]">{error}</span>
              <button
                className="customBtn"
                type="button"
                onClick={handleSave}
                disabled={saveLoading}
              >
                {saveBlog}
                {saveLoading && (
                  <Oval
                    height={20}
                    width={30}
                    color="#fff"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="black"
                    strokeWidth={6}
                    strokeWidthSecondary={6}
                  />
                )}
              </button>
            </form>
          </div>
        </>
      ) : (
        <Login
          handleLogin={getPrompt}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )}
    </div>
  );
};

export default CreateBlog;
