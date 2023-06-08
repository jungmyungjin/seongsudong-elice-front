import styles from './direction.module.scss';
import React, { useEffect } from 'react';

const EliceDirection: React.FC = () => {

  // 스크립트 파일 읽어오기
  const newScript = (src: string) => {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.addEventListener('load', () => {
        resolve();
      });
      script.addEventListener('error', e => {
        reject(e);
      });
      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    // 카카오맵 스크립트 읽어오기
    const myScript = newScript('https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=b27fea83f0e5437103ad76417aa855ac');

    // 스크립트 읽기 완료 후 카카오맵 설정
    myScript.then(() => {
      console.log('script loaded!!!');
      const kakao = (window as any)['kakao'];
      kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(37.54683016184554, 127.06628648846453), // 좌표설정
          level: 3
        };
        const map = new kakao.maps.Map(mapContainer as HTMLElement, options); // 맵생성
        // 마커설정
        const markerPosition = new kakao.maps.LatLng(37.54683016184554, 127.06628648846453);
        const marker = new kakao.maps.Marker({
          position: markerPosition
        });
        marker.setMap(map);
      });
    });
  }, []);

  return (
    <div>
      <div id="map" className={styles.map}></div>
    </div>
  );
};

export default EliceDirection;
