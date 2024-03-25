'use client'


import React, { CSSProperties } from 'react';


type OverflowX = 'visible' | 'hidden' | 'scroll' | 'auto' | 'initial' | 'inherit';


function CustomCodeRenderer({ data }: any) {
  const style = {
    pre: {
      backgroundColor: '#333',
      borderRadius: '0.5rem',
      padding: '1rem',
      overflowX: 'auto' as OverflowX,
    },
    code: {
      color: '#fff',
      fontSize: '0.875rem',
    },
    
    '@media (max-width: 768px)': {
      pre: {
        padding: '0.5rem',
      },
      code: {
        fontSize: '0.75rem',
        lineHeight: '1rem',
        width: '10%',
      },
    },
  };

  return (
    <pre style={style.pre}>
      <code style={style.code}>{data.code}</code>
    </pre>
  );
}

export default CustomCodeRenderer;