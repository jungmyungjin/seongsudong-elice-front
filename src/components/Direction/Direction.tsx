import styles from './direction.module.scss';
import darkStyles from './directionDark.module.scss';
import React, { useState, useEffect, useMemo } from 'react';
import { ReactComponent as Map } from 'assets/Map.svg';
import { ReactComponent as RoadMap } from 'assets/RoadMap.svg';
import { ReactComponent as FindRoute } from 'assets/FindRoute.svg';
import { useSelector } from 'react-redux';
import { RootState } from 'store/configureStore';

const EliceDirection: React.FC = () => {
  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mapUrl, setMapUrl] = useState('');

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

  // 길찾기 함수
  const findRoute = () => {
    if (navigator.geolocation) {
      // 현재 위치 정보를 가져옴
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude; // 현재 위치의 위도
        const longitude = position.coords.longitude; // 현재 위치의 경도

        // 카카오맵 길찾기 URL 생성
        const url = `https://map.kakao.com/link/to/성수 엘리스 랩,37.54683016184554,127.06628648846453/from/${latitude},${longitude}`;
        // console.log(url);
        // setMapUrl(url);
        window.open(url, '_blank');

        // 모달을 연다
        // setIsModalOpen(true);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    // 카카오맵 스크립트 읽어오기
    const myScript = newScript(
      `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}`,
    );

    // 스크립트 읽기 완료 후 카카오맵 설정
    myScript.then(() => {
      const kakao = (window as any)['kakao'];
      kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(37.54683016184554, 127.06628648846453), // 좌표설정
          level: 3,
        };
        const map = new kakao.maps.Map(mapContainer as HTMLElement, options); // 맵생성
        // 마커설정
        const markerPosition = new kakao.maps.LatLng(
          37.54683016184554,
          127.06628648846453,
        );
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    });
  }, []);

  const isDarkMode = useSelector(
    (state: RootState) => state.checkMode.isDarkMode,
  );

  const selectedStyles = useMemo(() => {
    return isDarkMode ? darkStyles : styles;
  }, [isDarkMode]);

  return (
    <div>
      <div className={selectedStyles.title}>
        <p>성수 엘리스 랩</p>
      </div>
      <div className={styles.mapTitle}>
        {/* <div className={styles.findRouteBtn}> */}
        <button onClick={findRoute}>
          <div className={selectedStyles.btnFindRoad}>
            <Map className={styles.mapSvg} />
            <p>엘리스랩 길찾기(클릭!)</p>
          </div>
        </button>
        {/* <div className={styles.findRouteBtn}> */}
        {/* <FindRoute /> */}
        {/* <button onClick={findRoute}>길찾기</button> */}
        {/* </div> */}
        {/* 모달 */}
        {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <iframe
                src={mapUrl}
                width='100%'
                height='100%'
                sandbox='allow-same-origin allow-scripts'
              ></iframe>
              <button onClick={() => setIsModalOpen(false)}>닫기</button>
            </div>
          </div>
        )}
      </div>
      <div className={styles.borderLine}></div>
      <div id='map' className={styles.map}></div>
      <div className={selectedStyles.RoadMap}>
        <RoadMap />
        <p>약도로 찾아가기</p>
      </div>
      <div className={styles.borderLine}></div>
      <div className={styles.imgRoadMap}>
        <img src='/images/eliceRoadMap.png' />
      </div>
    </div>
  );
};

export default EliceDirection;
