import express, { type Application, type Request, type Response } from "express"
const app:Application = express()
app.use()
app.get('/',(req:Request,res:Response)=>{
    res.status(200).json({
        "message":"u just landed on the landing route",
    })
})
export default app;