import React from 'react';

import { IconInterface } from 'types/customLink';
import { ReactComponent as Chat } from 'assets/Chat.svg';
import { ReactComponent as Notice } from 'assets/Notice.svg';
import { ReactComponent as Booking } from 'assets/Booking.svg';
import { ReactComponent as Calendar } from 'assets/Calendar.svg';
import { ReactComponent as Post } from 'assets/Post.svg';
import { ReactComponent as BookmarkBlock } from 'assets/BookmarkBlock.svg';
import { ReactComponent as Bookmark } from 'assets/Bookmark.svg';
import styles from './Icon.module.scss';

function Icon(props: IconInterface) {
  let icon = <div></div>;

  if (props.description === 'chat') {
    icon = <Chat />;
  }

  if (props.description === 'notice') {
    icon = <Notice />;
  }

  if (props.description === 'booking') {
    icon = <Booking />;
  }

  if (props.description === 'calendar') {
    icon = <Calendar />;
  }

  if (props.description === 'post') {
    icon = <Post />;
  }

  if (props.description === 'bookmark-block') {
    icon = <BookmarkBlock />;
  }

  if (props.description === 'bookmark') {
    icon = <Bookmark />;
  }

  return <div className={styles.icon_div}>{icon}</div>;
}

export default Icon;
