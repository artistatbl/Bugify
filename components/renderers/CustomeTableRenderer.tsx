import React from 'react';

const CustomTableRenderer = ({ data }: { data: any }) => {
  const headerStyle = {
    backgroundColor: 'black',
    color: 'white',
  };

  return (
    <table style={{ border: '2px solid black', borderCollapse: 'collapse', width: '100%', backgroundColor: 'gray' }}>
      {/* <thead style={headerStyle}>
        <tr>
          {data.content[0].map((heading: any, index: number) => (
            <th key={index} style={{ padding: '5px', border: '1px solid black' }}>
              {heading.header || heading.key || ''}
            </th>
          ))}
        </tr>
      </thead> */}
      <tbody>
	 {data.content.map((row: any[], rowIndex: number) => (
          <tr key={rowIndex}>
            {row.map((cell: any, cellIndex: number) => (
              <td key={cellIndex} style={{ padding: '5px', border: '2px solid black' }}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomTableRenderer;