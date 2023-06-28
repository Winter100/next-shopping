"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

// async function getMessage(id: string) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/note/getmessage/${id}`
//   );
//   const users = (await res.json()) as any[];
//   return users;
// }

const NoteInbox = (/*props: { id: string }*/ { data }: { data: any }) => {
  const notes = [
    {
      id: 11,
      sender: "John Doe",
      message: "안녕하세요",
    },
    { id: 21, sender: "Jane Smith", message: "잘 지내시죠?" },
    { id: 12, sender: "John Doe", message: "안녕하세요!" },
    { id: 32, sender: "Jane Smith", message: "잘 지내시죠?" },
    { id: 41, sender: "John Doe", message: "안녕하세요!" },
    { id: 52, sender: "Jane Smith", message: "잘 지내시죠?" },
    { id: 61, sender: "John Doe", message: "안녕하세요!" },
    { id: 72, sender: "Jane Smith", message: "잘 지내시죠?" },
    { id: 91, sender: "John Doe", message: "안녕하세요!" },
    { id: 22, sender: "Jane Smith", message: "잘 지내시죠?" },
    { id: 19, sender: "John Doe", message: "안녕하세요!" },
    { id: 312, sender: "Jane Smith", message: "잘 지내시죠?" },
  ];

  // const { data, isLoading, isFetching, error } = useQuery({
  //   queryKey: ["message", props.id],
  //   queryFn: () => getMessage(props.id),
  // });

  const [selectedNote, setSelectedNote] = useState(null);
  const [sendMessage, setSendMessage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 5;

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const sendMessageHandler = () => {};

  return (
    <div className="flex max-w-screen-xl mx-auto ">
      <div className="w-1/3 bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-200 px-4 py-3">
          <h3 className="text-lg font-semibold text-gray-800">쪽지 보관함</h3>
        </div>
        <div className="px-4 py-3">
          <ul>
            {data?.message.map((note) => (
              <li
                key={note.id}
                className={`border-b py-3 cursor-pointer ${
                  selectedNote === note ? "bg-blue-100" : ""
                }`}
                onClick={() => handleNoteClick(note)}
              >
                <span className="text-blue-500 font-semibold">
                  {note.sender}
                </span>
                <p className="text-gray-600">{note.message.slice(0, 10)}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-4 py-2 flex justify-center">
          {data.length > notesPerPage && (
            <nav className="pagination">
              <ul className="flex items-center">
                {Array(Math.ceil(data.length / notesPerPage))
                  .fill()
                  .map((_, index) => (
                    <li
                      key={index}
                      className={`mx-1 px-2 py-1 cursor-pointer ${
                        currentPage === index + 1
                          ? "bg-blue-500 text-white"
                          : "bg-white"
                      }`}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </li>
                  ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
      {selectedNote && (
        <div className="w-1/3 bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-gray-200 px-4 py-3 flex justify-around">
            <button>삭제</button>
            <h3 className="text-lg font-semibold text-gray-800">선택된 쪽지</h3>
            <button onClick={() => setSendMessage((pre) => !pre)}>답장</button>
          </div>
          <div className="px-4 py-3">
            <p className="text-gray-600">{selectedNote.message}</p>
          </div>
        </div>
      )}
      {sendMessage && (
        <div className="w-1/3 bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-gray-200 px-4 py-3 flex justify-around">
            <button>전송</button>
            <h3 className="text-lg font-semibold text-gray-800">답장</h3>
          </div>
          <div className="px-4 py-3">
            <textarea className="text-gray-600" />
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteInbox;
