import React from 'react';
import { BeatLoader } from 'react-spinners';

function Loading() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <BeatLoader color='#682be0' size={20} />
    </div>
  );
}

export default Loading;
