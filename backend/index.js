const express = require("express")
const cors= require("cors");
const app = express()
const mainrouter = require("./routes/index.js")

app.use(cors());
app.use(express.json())

app.use("/api/v1",mainrouter)

app.listen(3000,()=>console.log("listing on 3000"));


