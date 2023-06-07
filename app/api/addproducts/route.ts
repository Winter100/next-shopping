interface PostType {
  title: string;
  description: string;
  price: number;
  imageSrc: string | null;
  email: string | null | undefined;
  name: string | null | undefined;
  selectedValue: {
    random: string;
    isMeet: string;
    bargaining: string;
  };
}

export async function POST(item: PostType) {
  //Date 서버 타임스탬프로 바꾸기
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();

  const date = {
    year,
    month,
    day,
    hour,
    minute,
  };

  const { v4: uuidv4 } = require("uuid");
  const id = uuidv4();
  if (!item) {
    return { message: "제품정보 또는 로그인이 필요합니다." };
  }
  const setItem = {
    ...item,
    id,
    date,
  };

  const response = await fetch(
    "https://react-post-c4178-default-rtdb.firebaseio.com/shopping/products.json",
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(setItem),
    }
  );

  const data = response.json();
}
