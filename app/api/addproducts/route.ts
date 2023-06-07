interface PostType {
  title: string;
  description: string;
  price: number;
  imageSrc: string | null;
  email: string | null | undefined;
  name: string | null;
}

export async function POST(item: PostType) {
  const setItem = {
    ...item,
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
