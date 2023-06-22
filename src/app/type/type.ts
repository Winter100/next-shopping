export interface ProductsType {
  _id: any;
  title: string;
  description: string;
  price: number;
  selectedValue: {
    random: string;
    isMeet: string;
    bargaining: string;
  };
  imageSrc: string;
  email: string | null | undefined;
  name: string | null | undefined;
  date: {
    year: number;
    month: number;
    day: number;
  };
}

export interface User {
  email: string;
  password: string;
  name: string;
}
