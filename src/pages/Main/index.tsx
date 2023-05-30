import React, { useEffect } from 'react';
import styles from './main.module.scss';
import Input from 'components/common/Input';
import { utils } from 'utils/utils';
import FloatingButton from 'components/common/FloatingButton';
import ConfirmModal from 'components/common/ConfirmModal';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { openConfirmModal } from 'reducers/modal';

export default function Main() {
  const { isConfirmModalOpen } = useAppSelector(state => state.modal);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(openConfirmModal());
  }, []);
  return (
    <>
      <div className={styles.hello}>
        안녕 난 엘리스 레이서야
        <Input />
        <FloatingButton />
        {isConfirmModalOpen && (
          <ConfirmModal modalMessage='게시물을 삭제하시겠습니까?' />
        )}
        <div className={styles.test}></div>
      </div>
    </>
  );
}
