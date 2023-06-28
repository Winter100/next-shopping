"use client";
import React, { useState } from "react";

const NoteForm = ({ setIsNote }: any) => {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 쪽지 전송 로직 구현
    console.log("수신자:", recipient);
    console.log("메시지:", message);
    // 필요한 로직을 추가로 구현할 수 있습니다.
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6 h-[400px]">
        <h2 className="text-xl font-semibold mb-4 text-center">쪽지</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="howMessage"
            >
              연락방법:
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              type="text"
              id="howMessage"
              name="howMessage"
              placeholder="ex)카톡, 휴대폰 등"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              메시지:
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              id="message"
              name="message"
              placeholder="메시지를 입력하세요"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-around">
            <button
              onClick={() => setIsNote(false)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-indigo-200"
            >
              취소
            </button>
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-indigo-200"
              type="submit"
            >
              보내기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
