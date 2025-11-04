import express from 'express'

import{
    getAllData,
    deleteData,
    getDataByUsn,
    addUser,
    editData,

} from '../controller/user.controller.js'

import { authenticate } from '../controller/login.controller.js'

const app = express()
app.use(express.json())


app.get("/", getAllData)
app.post("/login", authenticate)
app.post("/adduser", addUser)
app.delete ("/delete/:username", deleteData)
app.get("/search", getDataByUsn)
app.put("/editdata/:username", editData)

export default app