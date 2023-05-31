export interface ImyPost {
  myPost: myPost[];
  loadMyPostLoading: boolean;
  loadMyPostDone: boolean;
  loadMyPostError: null | string;
  // hasMoreMyPost: boolean;
}

export interface myPost {
  id: number;
  name: string;
  created_at: string;
  views: number;
  title: string;
}
