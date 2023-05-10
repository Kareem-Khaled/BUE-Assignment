import React from 'react';

function ErrorMessage({ messages }) {
  const [header, ...paragraphs] = messages;

  return (
    <>
      <h1 className='display-5' style={{ color: '#ff5a5f' }}>
        {header}
      </h1>
      {paragraphs.map((message, index) => (
        <p className='h4 my-3' key={index}>
          {message}
        </p>
      ))}
    </>
  );
}

export default ErrorMessage;
