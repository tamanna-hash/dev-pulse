import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IUser, UserPayload } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../config";
const signupUserIntoDB = async (payload: IUser) => {
  const { name, email, password, role } = payload;

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
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

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;

  const userData = await pool.query(
    `
  SELECT * FROM users WHERE email=$1
  `,
    [email],
  );

  if (userData.rows.length == 0) {
    throw new Error("Invalid Credentials");
  }
  const user = userData.rows[0];
  const matchedPassword = bcrypt.compare(password, user.password);

  if (!matchedPassword) {
    throw new Error("Invalid Credentials ");
  }

  const jwtPayload: UserPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.ACCESS_TOKEN_SECRET_KEY as string,
    {
      expiresIn: "1d",
    },
  );
  // const refreshToken = jwt.sign(
  //   jwtPayload,
  //   config.REFRESH_TOKEN_SECRET_KEY as string,
  //   {
  //     expiresIn: "7d",
  //   },
  // );
  return { "token":accessToken,user };
};

export const authService = {
  signupUserIntoDB,
  loginUserIntoDB,
};
