import express, { type Application, type Request, type Response } from "express"
import initDB from "./db"
import cors from "cors"
const app:Application = express()
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded())
app.use(cors({
    origin: 'http://localhost:5000/',
}))
initDB()
app.get('/',(req:Request,res:Response)=>{
    res.status(200).json({
        "message":"u just landed on the landing route",
    })
})
export default app;