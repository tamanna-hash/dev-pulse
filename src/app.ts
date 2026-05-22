import express, { type Application, type Request, type Response } from "express"
import cors from "cors"
import { authRoute } from "./modules/auth/auth.route"
import { issueRoute } from "./modules/issue/issueRoute"
const app:Application = express()
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: 'http://localhost:5000/',
}))
app.use('/api/auth',authRoute)
app.use('/api/issues',issueRoute)






app.get('/',(req:Request,res:Response)=>{
    res.status(200).json({
        "message":"u just landed on the landing route",
    })
})
export default app;