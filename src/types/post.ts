export interface IPost {
  post: Post[];
  loadPostLoading: boolean;
  loadPostDone: boolean;
  loadPostError: null | string;
}

export interface Post {
  id: number;
  name: string;
  created_at: string;
  views: number;
  title: string;
}
