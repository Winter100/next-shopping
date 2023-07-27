export async function transFormedData(documents: any[]) {
  const transFormedData = documents.map((item) => {
    const dateObj = new Date(item.date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    return {
      title: item.title,
      price: item.price,
      date: { year, month, day },
      name: item.name,
      _id: item._id,
      mainImageSrc: item.mainImageSrc,
      subImageSrc: item.subImageSrc,
      soldout: item.soldout,
    };
  });

  return transFormedData;
}
