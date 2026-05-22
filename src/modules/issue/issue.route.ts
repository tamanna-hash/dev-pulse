import { Router } from "express";
import { issueController } from "./issue.controller";
import { auth } from "../../middleware/auth";
import { User_Role } from "../../type";

const router = Router();

router.post(
  "/",
  auth(User_Role.contributor, User_Role.maintainer),
  issueController.createIssue,
);
router.get("/", issueController.getIssues);
router.get('/:id',issueController.getSingleIssue)
router.put("/:id", auth(), issueController.updateIssue);
router.delete("/:id",auth(), issueController.deleteIssue);

export const issueRoute = router;
