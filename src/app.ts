import express, { type Application, type Request, type Response } from "express"
import cors from "cors"
import { userRoute } from "./modules/user/userRoute"
import { authRoute } from "./modules/auth/auth.route"
const app:Application = express()
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: 'http://localhost:5000/',
}))
app.use('/api/auth',authRoute)
// app.use('/api/issues',)






app.get('/',(req:Request,res:Response)=>{
    res.status(200).json({
        "message":"u just landed on the landing route",
    })
})
export default app;