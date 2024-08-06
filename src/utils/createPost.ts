import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/router";
import moment from "moment";
import { redirect } from "next/navigation";
const postsCollectionRef = collection(db, "posts");
export const createPost = async (
  title: string,
  category: string,
  excerpt: string,
  postContentValue: string,
  coverImg: any,
  status: string,
) => {
  await addDoc(postsCollectionRef, {
    title,
    category,
    excerpt,
    content: postContentValue,
    coverImg,
    status,
    dateCreated: moment().format("YYYY-MM-DD"),
  });
  return "success";
};

export const LOGIN = {
  NAME: "nuruddeendaza",
  PASSWORD: "#daza@@",
};
