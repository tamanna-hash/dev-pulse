import { pool } from "../../db";
import type { ICreateIssue, IIssue } from "./issueInterface";

const createIssueIntoDB = async (payload: ICreateIssue) => {
  const { title, description, type, status, reporter_id } = payload;

  // optional validation
  if (description.length < 20) {
    throw new Error("Description must be at least 20 characters");
  }

  const result = await pool.query(
    `
      INSERT INTO issues(
        title,
        description,
        type,
        status,
        reporter_id
      )
      VALUES($1,$2,$3,COALESCE($4,'open'),$5)
      RETURNING *
    `,
    [title, description, type, status, reporter_id],
  );

  return result.rows[0];
};

export const issueService = {
  createIssueIntoDB,
};
