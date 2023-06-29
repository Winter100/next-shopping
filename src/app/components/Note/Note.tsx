"use client";

import { useParams } from "next/navigation";
import { useRef } from "react";

export default function Note({ setIsNote }: { setIsNote: any }) {
  const textAreaRef = useRef(null);
  const messengerRef = useRef(null);
  const params = useParams();

  async function submitNote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!textAreaRef.current) {
      return;
    }

    const textValue: string = textAreaRef.current.value.trim();

    if (textValue.length < 1) {
      return;
    }

    const response = await fetch(`/api/note/${params.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ textValue }),
    });

    console.log(await response.json());
  }
  return (
    <form onSubmit={submitNote}>
      <div className="bg-yellow-100 rounded p-4 shadow-md">
        <textarea
          ref={textAreaRef}
          className="w-full h-40 resize-none border border-gray-300 p-2 mb-4"
          placeholder={`연락방법과 할 말을 적어주세요. 예) 구매원합니다, 카톡:XXXXX`}
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
