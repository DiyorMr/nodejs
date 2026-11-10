import express from "express"
import courses from "./data/courses.js"

const app = express()
app.use(express.json())

app.get("/courses", (req, res) => {
    res.json(courses)
})
const Port = process.env.PORT || 3000
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`)
})