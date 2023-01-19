//npm i --save-dev @types/bcryptjs
import { hash, compare } from "bcryptjs";

export async function hashPassword(password: string) {
  const hashedPw = await hash(password, 12);
  return hashedPw;
}

export async function comparePassword(pw: string, hashedPw: string) {
  const isEqual = await compare(pw, hashedPw);
  return isEqual;
}
