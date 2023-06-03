import React, { useState, MouseEvent } from 'react';
import styles from './signupSelectBtn.module.scss';
import svgDown from 'assets/ChevronDown.svg';
import useHideOnClickOutside from 'hooks/useHideOnClickOutside';

// SignUpSelectBtn 컴포넌트
interface SignUpSelectBtnProps {
  buttonName: string;
  buttonList: string[];
  onValueSelected: (value: string) => void; // 콜백 함수 prop 추가
}

const SignUpSelectBtn = (props: SignUpSelectBtnProps): React.ReactElement => {
  const [selectBtn, setSelectBtn] = useState('');
  const { ref, isVisible, setIsVisible } = useHideOnClickOutside(false);

  const menuBtnHandle = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // 기본 동작 막기
    setIsVisible(!isVisible);
  };

  const selectHandle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 기본 동작 막기
    const value = e.currentTarget.value;
    setSelectBtn(value);
    setIsVisible(false); // 선택 후 메뉴 숨기기
    props.onValueSelected(value); // 선택한 값을 부모 컴포넌트에 전달
  };

  return (
    <div className={styles.buttonLayout}>
      <div
        key={props.buttonName}
        onClick={menuBtnHandle}
        className={styles.selectSubject}
      >
        <span>{selectBtn || props.buttonName}</span>
        <img src={svgDown} alt='메뉴' />
      </div>
      <div
        ref={ref}
        className={
          isVisible ? styles.selectLists : styles.hiddenMenu // isVisible 상태만으로 클래스 결정
        }
      >
        {props.buttonList.map(list => (
          <button
            onClick={selectHandle}
            className={styles.selectList}
            value={list}
            key={list}
          >
            <span>{list}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SignUpSelectBtn;
