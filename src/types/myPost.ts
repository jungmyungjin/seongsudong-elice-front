export interface ImyPost {
  myPost: myPost[];
  loadMyPostLoading: boolean;
  loadMyPostDone: boolean;
  loadMyPostError: null | string;
}

export interface myPost {
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
