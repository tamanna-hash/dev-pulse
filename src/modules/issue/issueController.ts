import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { issueService } from "./issueService";

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
      statusCode: 404,
      message: error.message,
      error: error,
    });
  }
};
export const issueController = {
  createIssue,
};
