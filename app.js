const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")

const port = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"

main().then(()=>{
    console.log("The Database is Connected");
}).catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URL)
}

app.listen(port, ()=>{
    console.log(`The website is listening to localhost:${port}`);  
})

app.get("/",(req,res)=>{
    res.send("This is Home Page")
})

app.get("/testListing", async (req,res)=>{
    
    const sampleListing = new Listing({
        title: "Sagar's Home", 
        description: "Nothing Much",
        price: "12,000",
        location: "Hubli, Karnataka", 
        country: "India"
    })

    await sampleListing.saveMany().then(()=>{
        console.log("Sample Data Saved");
        res.send("Working")
    }).catch((e)=>{
        console.log(e);
        res.send("Not Working")
    });
})