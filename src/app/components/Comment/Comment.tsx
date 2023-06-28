// CommentList.js

import React from "react";

const CommentList = () => {
  const dummyComments = [
    { name: "User 1", message: "첫 번째 댓글입니다." },
    { name: "User 2", message: "두 번째 댓글입니다." },
    { name: "User 3", message: "세 번째 댓글입니다." },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-center">문의하기</h2>
      {dummyComments.length === 0 ? (
        <p>댓글이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {dummyComments.map((comment, index) => (
            <li key={index} className="border border-gray-300 p-4 rounded-md">
              <p className="font-semibold">{comment.name}</p>
              <p>{comment.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentList;
