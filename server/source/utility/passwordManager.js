import { hash, compare } from "bcryptjs";
export const hashPassword = async (password) => {
  try {
    const hashedPassword = await hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
