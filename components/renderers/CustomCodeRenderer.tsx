'use client'

import React from 'react';

function CustomCodeRenderer({ data }: any) {
  const style = {
    pre: {
      backgroundColor: '#333',
      borderRadius: '0.5rem',
      padding: '1rem',
      //overflowX: 'auto',
	 overflowX: 'auto' as 'auto',

    },
    code: {
      color: '#fff',
      fontSize: '0.875rem',
    },
    
    // Add more styles for responsiveness based on screen sizes using media queries
    '@media (max-width: 768px)': {
      pre: {
        padding: '0.5rem',
      },
      code: {
        fontSize: '0.75rem',
	   lineHeight: '1rem',
	   with: '10%',
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