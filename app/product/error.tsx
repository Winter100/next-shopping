"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.push("/"); // 이동할 경로를 설정합니다.
    }, 2000);

    return () => {
      clearTimeout(timeoutId); // 컴포넌트가 언마운트되면 타이머를 클리어합니다.
    };
  }, []);

  return <p>알 수 없는 오류가 발생했습니다. 잠시 후 HOME으로 이동 됩니다.</p>;
}
