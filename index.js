import express, { json, urlencoded } from "express"
import dotenv from "dotenv"
import { dbConn } from "./dbCon/dbCon.js"
import { projectRouter } from "./routers/projectRouter.js"
import { projectsLanguageRouter } from "./routers/projectLanguageRouter.js"
import { ContactRouter } from "./routers/ContactRouter.js"
import cors from "cors"

dotenv.config()
const app = express()

app.use(cors())
app.use(urlencoded({extended:true}))
app.use(json())
app.use("/api",projectRouter)
app.use("/api",projectsLanguageRouter)
app.use("/api",ContactRouter)
dbConn(process.env.DB_URL)
const port=process.env.PORT

app.listen(port, (() => {
    console.log(`http://localhost:${port}`)
}))

