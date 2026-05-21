import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IUser } from "./auth.interface";
const signupUserIntoDB = async (payload: IUser) => {
  const { name, email, password, role } = payload;

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword );
  // 1.check if the user already exist
  const existingUser = await pool.query(
    `
    SELECT * FROM users WHERE email=$1 
    `,
    [email],
  );
  if (existingUser.rows.length > 0) {
    throw new Error("Email Already Exists");
  }

  const result = await pool.query(
    `
    INSERT INTO users(name,email,password,role) VALUES ($1,$2,$3, COALESCE($4,'contributor'))
    RETURNING *
`,
    [name, email, hashedPassword, role],
  );
  delete result.rows[0].password;
  console.log(result);
  return result;
};

export const authService = {
  signupUserIntoDB,
};
