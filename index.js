require("dotenv").config()
const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const authRoutes=require("./routes/auth.routes")
const profileRoutes=require("./routes/profile.routes")
const app=express()
const corsOptions={
 origin:["http://localhost:5173",
    "https://gpt-3-brainerx.netlify.app"
 ]
}
app.use(cors(corsOptions))
app.use(express.json())
app.use("/auth",authRoutes)
app.use("",profileRoutes)



mongoose.connect(process.env.DATABASE_URL,{
    serverSelectionTimeoutMS:5000
}).then(()=>{
//lancement du serveur
app.listen(process.env.PORT || 5000,()=>{
    console.log("the server is starting")
})
}).catch((error)=>{
    console.log(error)
})
