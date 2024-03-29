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
      router.push("/");
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [router]);

  return (
    <div className="m-auto flex items-center justify-center text-2xl font-bold w-80 h-80">
      알 수 없는 오류가 발생했습니다. 잠시 후 HOME으로 이동됩니다.
    </div>
  );
}
