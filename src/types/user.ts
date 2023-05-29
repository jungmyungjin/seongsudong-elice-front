export interface Iuser {
  myInfo: Imyinfo;
  loadMyInfoLoading: boolean;
  loadMyInfoDone: boolean;
  loadMyInfoError: null | string;
}

interface Imyinfo {
  profileId: null | string;
  email: null | string;
  name: null | string;
}
