const express = require('express')
const cors = require("cors")
const screenshotRouter = require('./routes/screenshot.routes')
const bodyParser = require("body-parser");


const PORT = process.env.PORT || 8080

const app = express()

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json())
app.use('/', screenshotRouter)


app.listen(PORT, () => console.log(`server stared on port ${PORT}`))