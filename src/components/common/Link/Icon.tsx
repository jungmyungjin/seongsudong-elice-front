import React from 'react';

import { IconInterface } from 'types/customLink';
import styles from './Icon.module.scss';

function Icon(props: IconInterface) {
  let icon = <div></div>;

  if (props.description === 'chat') {
    icon = (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='icon icon-tabler icon-tabler-brand-wechat'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        strokeWidth='2.5'
        stroke='#ffffff'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M16.5 10c3.038 0 5.5 2.015 5.5 4.5c0 1.397 -.778 2.645 -2 3.47l0 2.03l-1.964 -1.178a6.649 6.649 0 0 1 -1.536 .178c-3.038 0 -5.5 -2.015 -5.5 -4.5s2.462 -4.5 5.5 -4.5z' />
        <path d='M11.197 15.698c-.69 .196 -1.43 .302 -2.197 .302a8.008 8.008 0 0 1 -2.612 -.432l-2.388 1.432v-2.801c-1.237 -1.082 -2 -2.564 -2 -4.199c0 -3.314 3.134 -6 7 -6c3.782 0 6.863 2.57 7 5.785l0 .233' />
        <path d='M10 8h.01' />
        <path d='M7 8h.01' />
        <path d='M15 14h.01' />
        <path d='M18 14h.01' />
      </svg>
    );
  }

  if (props.description === 'notice') {
    icon = (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='icon icon-tabler icon-tabler-speakerphone'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        strokeWidth='2.5'
        stroke='#ffffff'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M18 8a3 3 0 0 1 0 6' />
        <path d='M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5' />
        <path d='M12 8h0l4.524 -3.77a.9 .9 0 0 1 1.476 .692v12.156a.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8' />
      </svg>
    );
  }

  if (props.description === 'booking') {
    icon = (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='icon icon-tabler icon-tabler-checklist'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        strokeWidth='2.5'
        stroke='#ffffff'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8' />
        <path d='M14 19l2 2l4 -4' />
        <path d='M9 8h4' />
        <path d='M9 12h2' />
      </svg>
    );
  }

  if (props.description === 'calendar') {
    icon = (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='icon icon-tabler icon-tabler-calendar-event'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        strokeWidth='2.5'
        stroke='#ffffff'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z' />
        <path d='M16 3l0 4' />
        <path d='M8 3l0 4' />
        <path d='M4 11l16 0' />
        <path d='M8 15h2v2h-2z' />
      </svg>
    );
  }

  if (props.description === 'post') {
    icon = (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='icon icon-tabler icon-tabler-clipboard-list'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        strokeWidth='2.5'
        stroke='#ffffff'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2' />
        <path d='M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z' />
        <path d='M9 12l.01 0' />
        <path d='M13 12l2 0' />
        <path d='M9 16l.01 0' />
        <path d='M13 16l2 0' />
      </svg>
    );
  }

  if (props.description === 'bookmark-block') {
    icon = (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='icon icon-tabler icon-tabler-bookmark-off'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        strokeWidth='2.5'
        stroke='#ffffff'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M3 3l18 18' />
        <path d='M17 17v3l-5 -3l-5 3v-13m1.178 -2.818c.252 -.113 .53 -.176 .822 -.176h6a2 2 0 0 1 2 2v7' />
      </svg>
    );
  }

  if (props.description === 'bookmark') {
    icon = (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='icon icon-tabler icon-tabler-bookmark'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        strokeWidth='2.5'
        stroke='#ffffff'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M9 4h6a2 2 0 0 1 2 2v14l-5 -3l-5 3v-14a2 2 0 0 1 2 -2' />
      </svg>
    );
  }

  return <div className={styles.icon_div}>{icon}</div>;
}

export default Icon;
