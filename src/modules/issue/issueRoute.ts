import { Router } from "express";
import { issueController } from "./issueController";
import { auth } from "../../middleware/auth";
import { User_Role } from "../../type";

const router = Router()

router.post('/',auth(User_Role.contributor,User_Role.maintainer), issueController.createIssue)
// router.get('/',issueController.createIssue)
// router.get('/:id',issueController.createIssue)
// router.put('/:id',issueController.createIssue)
// router.delete('/:id',issueController.createIssue)

export const issueRoute = router