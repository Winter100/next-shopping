export interface ProductsType {
  _id: any;
  title: string;
  description: string;
  price: number;
  contact: string;
  selectedValue: {
    random: string;
    isMeet: string;
    bargaining: string;
  };
  mainImageSrc: string;
  subImageSrc: string[];
  email: string | null | undefined;
  name: string | null | undefined;
  date: {
    year: number;
    month: number;
    day: number;
  };
  soldout?: boolean;
}

export interface User {
  email: string;
  password: string;
  name: string;
}

export interface signUpInput {
  email: string;
  password: string;
  name: string;
  checkPassword: string;
}
