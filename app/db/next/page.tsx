export default async function DbsPage() {
  const data = await getData();
  console.log(data);

  return <></>;
}

async function getData() {
  const response = await fetch("/api/dbtest", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data;
}
