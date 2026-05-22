import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";

const createIssue = async (req: Request, res: Response) => {
  try {
    
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
