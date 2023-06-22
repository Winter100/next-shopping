import { User } from "@/app/type/type";

export function checkUser(data: User, checkPassword: string) {
  const { email, password, name } = data;

  if (!email.includes("@")) {
    return { isValid: false, message: "이메일은 @가 포함되어야 합니다." };
  } else if (email.trim().length < 3) {
    return { isValid: false, message: "이메일은 최소 4자 이상입니다." };
  } else if (password.trim().length < 6) {
    return { isValid: false, message: "비밀번호는 6자 이상입니다." };
  } else if (name.trim().length < 1) {
    return { isValid: false, message: "닉네임은 1글자 이상입니다." };
  } else if (password !== checkPassword) {
    return { isValid: false, message: "비밀번호가 서로 다릅니다." };
  }

  return { isValid: true, message: "가입 검증 통과" };
}
