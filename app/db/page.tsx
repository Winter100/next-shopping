"use client";

export default function DbPage() {
  async function clickHandler(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/dbtest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: "홍길동" }),
    });
    const data = await response.json();

    console.log(data);
  }
  return (
    <>
      <form onSubmit={clickHandler}>
        <input type="text"></input>
        <button>확인</button>
      </form>
    </>
  );
}
