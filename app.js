const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

const port = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("The Database is Connected");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// app.get("/testListing", async (req,res)=>{

//     const sampleListing = new Listing({
//         title: "Sagar's Home",
//         description: "Nothing Much",
//         price: "12,000",
//         location: "Hubli, Karnataka",
//         country: "India"
//     })

//     await sampleListing.insertMany().then(()=>{
//         console.log("Sample Data Saved");
//         res.send("Working")
//     }).catch((e)=>{
//         console.log(e);
//         res.send("Not Working")
//     });
// })

app.listen(port, () => {
  console.log(`The website is listening to http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("This is Home Page");
});

// Index Route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

// New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// New Route Post

app.post("/listings", (req, res) => {
  const body = new Listing(req.body);

  body.save();
  res.redirect("/listings");
});

// Show Route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});
