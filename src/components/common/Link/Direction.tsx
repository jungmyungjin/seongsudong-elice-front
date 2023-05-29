import React from 'react';

import { DirectionInterface } from 'types/customLink';
import styles from './Direction.module.scss';

function Direction(props: DirectionInterface) {
  let icon = <div></div>;

  if (props.right) {
    icon = (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='icon icon-tabler icon-tabler-chevron-right'
        width='32'
        height='32'
        viewBox='0 0 24 24'
        strokeWidth='2.5'
        stroke='#682be0'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M9 6l6 6l-6 6' />
      </svg>
    );
  }

  if (!props.right) {
    icon = (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='icon icon-tabler icon-tabler-chevron-left'
        width='32'
        height='32'
        viewBox='0 0 24 24'
        strokeWidth='2.5'
        stroke='#682be0'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M15 6l-6 6l6 6' />
      </svg>
    );
  }

  return <div className={styles.direction_div}>{icon}</div>;
}

export default Direction;
