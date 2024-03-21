import React from 'react';

const Message = ({ message, isCurrentUser }) => {
  return (
    <div className={`p-1 px-4 w-full rounded-3xl flex ${isCurrentUser && " justify-end"}`}>
      <div className={`${isCurrentUser ? "bg-blue-600 p-1 px-3 rounded-3xl" : "bg-zinc-600 p-1 px-3 rounded-3xl"}  max-w-full h-auto break-words`}>
        <span className='text-sm h-auto'>{message}</span>
      </div>
    </div>
  );
};

export default Message;
