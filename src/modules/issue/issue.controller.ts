import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { issueService } from "./issue.service";
import type { Query } from "../../type";
import type { JwtPayload } from "jsonwebtoken";

// create issue
const createIssue = async (req: Request, res: Response) => {
  try {
    const reporter_id = req.user?.id;

    const payload = {
      ...req.body,
      reporter_id,
    };

    const result = await issueService.createIssueIntoDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Issue created successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    sendResponse(res, {
      success: false,
      statusCode: 500,
      message: error.message,
      error: error,
    });
  }
};
// get all issues
const getIssues = async (req: Request, res: Response) => {
  try {
    const result = await issueService.getIssuesFromDB(req.query as Query);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Issues fetched successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error);

    sendResponse(res, {
      success: false,
      statusCode: 500,
      message: error.message,
      error,
    });
  }
};
// get single issue
const getSingleIssue = async (req: Request, res: Response) => {
  try {
    const issueId = Number(req.params.id);

    const result = await issueService.getSingleIssueFromDB(issueId);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Issue fetched successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error);

    sendResponse(res, {
      success: false,
      statusCode: 404,
      message: error.message,
      error,
    });
  }
};

// update issue
const updateIssue = async (req: Request, res: Response) => {
  try {
    const issueId = Number(req.params.id);

    const user = req.user;

    const result = await issueService.updateIssueIntoDB(
      issueId,
      req.body,
      user,
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Issue updated successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error);

    sendResponse(res, {
      success: false,
      statusCode: 500,
      message: error.message,
      error,
    });
  }
};

// delete issue
const deleteIssue = async (req: Request, res: Response) => {
  try {
    const issueId = Number(req.params.id);

    const user = req.user!;

    await issueService.deleteIssueFromDB(issueId, user);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Issue deleted successfully",
      data: null,
    });
  } catch (error: any) {
    console.log(error);

    sendResponse(res, {
      success: false,
      statusCode: 500,
      message: error.message,
      error,
    });
  }
};
export const issueController = {
  createIssue,
  getIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};
