export interface IPost {
  post: Post[];
  loadPostLoading: boolean;
  loadPostDone: boolean;
  loadPostError: null | string;
}

export interface Post {
  id: number;
  category: string;
  title: string;
  images: string;
  description: string;
  created_at: string;
  views: number;
  email: string;
  name: string;
  generation: string;
  isAdmin: number;
}
