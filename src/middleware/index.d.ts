import type { JwtPayload } from "jsonwebtoken";
import type { TJwtPayload } from "../modules/issue/issue.interface";

declare global{
    namespace Express {
        interface Request {
            user?: TJwtPayload
        }
    }
}