const express=require("express");
const cors=require("cors");
const {connectToMongoDB}=require("./connect")
const URL=require("./models/url");
const urlRoute=require("./routes/url")
const app=express();
const PORT=8001;
app.use(express.json())
connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=>console.log("mongodb connected"))
app.use(cors());
app.use("/url",urlRoute)
app.get("/:shortId",async(req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId,
    },
    {
        $push:{
            visitHistory:{
                timestamp:Date.now()
            },
        },

    }

)
res.redirect(entry.redirectURL);
})
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}` )
})