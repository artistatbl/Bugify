'use client'

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import CustomCodeRenderer from '@/components/renderers/CustomCodeRenderer';
import CustomTableRenderer from '@/components/renderers/CustomeTableRenderer';
import CustomImageRenderer from '@/components/renderers/CustomImageRenderer';

const Output = dynamic(
  async () => (await import('editorjs-react-renderer')).default,
  { ssr: false }
);

interface EditorOutputProps {
  content: any; // Assuming this is the structured content from EditorJS
}

const renderers = {
  // Uncomment or add custom renderers as needed
  // image: CustomImageRenderer,
  code: CustomCodeRenderer,
  table: CustomTableRenderer,
};

const style = {
  paragraph: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    marginBottom: '0.5rem',
    spacing: '0.025rem',
  },
  // Additional styles omitted for brevity...
};

const EditorOutput: React.FC<EditorOutputProps> = ({ content }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  // Example function to toggle the content view
  const toggleContentView = () => {
    setShowFullContent(!showFullContent);
  };

  // Simplified logic to determine if the content exceeds a certain size
  // This is a placeholder. Implement according to your content's structure
  const contentIsLarge = content.blocks && content.blocks.length > 3; // Example condition

  // Render full or truncated content based on state
  return (
    <>
      {showFullContent || !contentIsLarge ? (
        <Output
          style={style}
          className="text-sm"
          renderers={renderers}
          data={content}
        />
      ) : (
        // Optionally, render a truncated version or a preview here
        <Output
          style={style}
          className="text-sm"
          renderers={renderers}
      
          data={{ blocks: content.blocks.slice(0, 2) }} 
        />
      )}
      {contentIsLarge && (
        <button onClick={toggleContentView} className="text-blue-500">
          {showFullContent ? 'View Less' : 'View More'}
        </button>
      )}
    </>
  );
};

export default EditorOutput;
