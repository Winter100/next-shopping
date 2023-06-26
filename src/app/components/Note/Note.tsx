"use client";

import { useRef } from "react";

export default function Note({ setIsNote }: { setIsNote: any }) {
  const textAreaRef = useRef(null);
  async function submitNote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const textValue = textAreaRef.current.value;

    if (textValue.length < 1) {
      return;
    }
  }
  return (
    <form onSubmit={submitNote}>
      <div className="bg-yellow-100 rounded p-4 shadow-md">
        <textarea
          ref={textAreaRef}
          className="w-full h-40 resize-none border border-gray-300 p-2 mb-4"
          placeholder="남길 메시지를 적어주세요."
        />
        <div className="flex justify-between">
          <button
            onClick={() => setIsNote(false)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            취소
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            보내기
          </button>
        </div>
      </div>
    </form>
  );
}
