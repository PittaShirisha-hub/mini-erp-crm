import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mini_erp_secret";

export const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "7d",
  });
};