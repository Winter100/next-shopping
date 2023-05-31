import { User } from "@/type/type";

export function checkUser(data: User) {
  const { email, password, name } = data;

  if (
    !email.includes("@") ||
    email.trim().length < 1 ||
    password.trim().length < 6 ||
    name.length < 1
  ) {
    return false;
  } else {
    return true;
  }
}
