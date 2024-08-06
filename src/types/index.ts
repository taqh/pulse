interface User {
  name: string;
  image: string;
}

export type Post = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImg: string;
  status: string;
  category: string;
  dateCreated?: string;
};
