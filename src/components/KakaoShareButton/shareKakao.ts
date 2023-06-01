const { Kakao } = window;

export const shareKakao = (description: string) => {
  if (Kakao.isInitialized()) {
    Kakao.Share.sendDefault({
      objectType: 'text',
      text: description,
      link: {
        mobileWebUrl: `${process.env.REACT_APP_DEPLOY_URL}`,
        webUrl: `${process.env.REACT_APP_DEPLOY_URL}`,
      },
      buttons: [
        {
          title: '새 예약하러 가기',
          link: {
            mobileWebUrl: `${process.env.REACT_APP_DEPLOY_URL}`,
            webUrl: `${process.env.REACT_APP_DEPLOY_URL}`,
          },
        },
      ],
    });
  }
};
