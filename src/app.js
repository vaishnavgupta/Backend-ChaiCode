import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "20kb"}))  //App can accept json upto 20kb
app.use(express.urlencoded({extended:true , limit: "20kb"}))  //App can accept data from url
app.use(express.static("public"))  //App can store files in public folder
app.use(cookieParser())  //App can do CRUD ops on user cookies


// routes import
import userRouter from "./routes/user.route.js"

app.use("/api/v1/users",userRouter)


export { app }