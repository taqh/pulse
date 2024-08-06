"use client";
import "../editorStyle.css";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Image from "next/image";
import { db } from "@/firebase";
import { LOGIN } from "@/utils/createPost";
import Login from "@/components/Login";
const EditBlog = () => {
  const notify = (arg: any) => toast(arg);
  const navigate = useRouter();
  const params: any = useSearchParams();
  const [postContentValue, setPostContentValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImg, setCoverImg] = useState<any>("");
  const [isAuth, setIsAuth] = useState(false);
  const [status, setStatus] = useState("");
  const [blogId, setBlogId] = useState("");
  const [error, setError] = useState("");
  const [category, setCategory] = useState<any>("News");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = async (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        setCoverImg(reader.result);
      }
    };
  };
  const id = params.get("id");
  const docRef = doc(db, "posts", id);

  const handleUpdateBlog = async () => {
    setLoading(true);
    await setDoc(docRef, {
      title,
      excerpt,
      content: postContentValue,
      coverImg,
      category,
      status,
    });
    setLoading(false);
    notify("Blog Updated");
    navigate.push("/admin");
  };

  const getPrompt = () => {
    setLoading(true);
    if (username === LOGIN.NAME && password === LOGIN.PASSWORD) {
      console.log("CLIKCED");
      setIsAuth(true);
    } else {
      console.log("CLIKCED", username, password, LOGIN.NAME, LOGIN.PASSWORD);

      notify("Incorrect Credentials");
    }
    setLoading(false);
  };

  const getPost = async () => {
    setLoading(true);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const res = docSnap.data();

      setTitle(res.title);
      setExcerpt(res.excerpt);
      setPostContentValue(res.content);
      setCoverImg(res.coverImg);
      setStatus(res.status);
      setBlogId(id);
      setCategory(res.category);
      setLoading(false);
    } else {
      notify("Post Not Found");
    }
    setLoading(false);
  };

  useEffect(() => {
    // console.log(postId);

    getPost();
  }, [params]);
  return (
    <Suspense>
      <ToastContainer />
      {!isAuth ? (
        <Login
          handleLogin={getPrompt}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        <div className="mb-20 flex flex-col items-center">
          <h1 className="text-3xl font-bold">Edit Post</h1>
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
                style={{ backgroundColor: "white" }}
                className="blogFontFamily mb-20 h-[25rem] bg-white"
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
                value={category}
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
                value={status}
              >
                <option value="draft">draft</option>
                <option value="publish">publish</option>
              </select>
              <span className="text-[orangered]">{error}</span>
              <input
                type="submit"
                value={loading ? "Saving..." : "Save"}
                disabled={loading}
                className="my-3 cursor-pointer rounded-md border-2 bg-green-500 p-5 text-xl font-bold text-white"
                onClick={(e) => {
                  e.preventDefault();
                  setError("");
                  handleUpdateBlog().catch((e) => {
                    setLoading(false);
                    setError("Image too large");
                  });
                }}
              />
            </form>
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default EditBlog;
