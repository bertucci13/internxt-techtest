import React from 'react';
import './spinner.styles.css';
export const Spinner = () => {
  return (
    <div className='spinner-ellipsis' data-testid='spinner-ellipsis'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
