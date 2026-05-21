import type { Request, Response } from "express";

const createIssue = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
export const issueController = {
  createIssue,
};
