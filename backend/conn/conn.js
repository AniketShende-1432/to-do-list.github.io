const mongoose = require("mongoose");

const conn = async(req,res)=>{
    try {
        await mongoose.connect("mongodb+srv://aniketshende:Aniket%4021@cluster0.sbzcvy5.mongodb.net/")
        .then(()=>{
            console.log("Connected ");
        });
    } catch (error) {
        res.status(400).json({
            message: "Not Connected",
        });
    }
         
};
conn();