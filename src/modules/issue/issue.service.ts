import type { JwtPayload } from "jsonwebtoken";
import { pool } from "../../db";
import type { Query } from "../../type";
import type { ICreateIssue, IIssue, IUpdateIssue } from "./issue.interface";

// create issue into DB
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
// get issues  from DB
const getIssuesFromDB = async (query: Query) => {
  const { sort = "newest", type, status } = query;

  let sql = `SELECT * FROM issues`;
  const conditions: string[] = [];
  const values: any[] = [];

  // filtering
  if (type) {
    values.push(type);
    conditions.push(`type = $${values.length}`);
  }

  if (status) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }

  // add WHERE if conditions exist
  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(" AND ")}`;
  }

  // sorting
  if (sort === "oldest") {
    sql += ` ORDER BY created_at ASC`;
  } else {
    sql += ` ORDER BY created_at DESC`;
  }

  // fetch issues
  const issuesResult = await pool.query(sql, values);

  const issues = issuesResult.rows;

  // collect reporter ids
  const reporterIds = [...new Set(issues.map((issue) => issue.reporter_id))];

  // fetch reporters
  const reportersResult = await pool.query(
    `
      SELECT id,name,role
      FROM users
      WHERE id = ANY($1)
    `,
    [reporterIds],
  );

  const reporters = reportersResult.rows;

  // merge reporter data
  const issuesWithReporter = issues.map((issue) => {
    const reporter = reporters.find((user) => user.id === issue.reporter_id);

    return {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,
      reporter,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
    };
  });

  return issuesWithReporter;
};
// get single issue  from DB
const getSingleIssueFromDB = async (issueId: number) => {
  // get issue
  const issueResult = await pool.query(
    `
      SELECT * FROM issues
      WHERE id = $1
    `,
    [issueId],
  );

  if (issueResult.rows.length === 0) {
    throw new Error("Issue not found");
  }

  const issue = issueResult.rows[0];

  // get reporter separately (without JOIN)
  const reporterResult = await pool.query(
    `
      SELECT id,name,role
      FROM users
      WHERE id = $1
    `,
    [issue.reporter_id],
  );

  const reporter = reporterResult.rows[0];

  return {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter,
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };
};
// update issue into DB
const updateIssueIntoDB = async (
  issueId: number,
  payload: IUpdateIssue,
  user: JwtPayload,
) => {
  // 1. check issue exists
  const issueResult = await pool.query(
    `
      SELECT * FROM issues
      WHERE id = $1
    `,
    [issueId],
  );

  if (issueResult.rows.length === 0) {
    throw new Error("Issue not found");
  }

  const issue = issueResult.rows[0];

  // 2. authorization check

  // maintainer can update any issue
  if (user.role !== "maintainer") {
    // contributor rules
    const isOwner = issue.reporter_id === user.id;
    const isOpen = issue.status === "open";

    if (!isOwner || !isOpen) {
      throw new Error("You are not authorized to update this issue");
    }
  }

  // 3. update fields
  const title = payload.title || issue.title;

  const description = payload.description || issue.description;

  const type = payload.type || issue.type;

  // optional validation
  if (description.length < 20) {
    throw new Error("Description must be at least 20 characters");
  }

  // 4. update query
  const result = await pool.query(
    `
      UPDATE issues
      SET
        title = $1,
        description = $2,
        type = $3,
        updated_at = NOW()
      WHERE id = $4
      RETURNING *
    `,
    [title, description, type, issueId],
  );

  return result.rows[0];
};
// delete issue from DB
const deleteIssueFromDB = async (issueId: number, user: JwtPayload) => {
  // only maintainer can delete
  if (user.role !== "maintainer") {
    throw new Error("You are not authorized to delete issues");
  }

  // check issue exists
  const issueResult = await pool.query(
    `
      SELECT * FROM issues
      WHERE id = $1
    `,
    [issueId],
  );

  if (issueResult.rows.length === 0) {
    throw new Error("Issue not found");
  }

  // delete issue
  await pool.query(
    `
      DELETE FROM issues
      WHERE id = $1
    `,
    [issueId],
  );

  return null;
};
export const issueService = {
  createIssueIntoDB,
  getIssuesFromDB,
  getSingleIssueFromDB,
  updateIssueIntoDB,
  deleteIssueFromDB,
};
