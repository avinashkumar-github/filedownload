const express = require('express');
const fs = require("fs");
const https = require("https");
const app = express();


const url = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json"

app.get("/download/withoutfilereference", function(req, res) {
    let jsonData = "";
    https.get(url, (response)=>{
        response.on("data", (dataPart)=>{
            jsonData += dataPart;
        }),
        response.on("end", ()=>{
            // res.setHeader("Content-Type", "text/csv");
            res.setHeader("Content-Disposition", "attachment; filename=test.json");
            res.status(200).end(jsonData);
        })
    })
})


app.get("/download/withfilereference", function(req, res) {
    let jsonData = "";
    https.get(url, (response)=>{
        response.on("data", (dataPart)=>{
            jsonData += dataPart;
        }),
        response.on("end", ()=>{
            fs.writeFileSync("test.json", jsonData);
            res.download('test.json')
        })
    })
})



app.get('/', function (req, res) {

    res.send({
        "downdown by file ref ": "/download/withfilereference",
        "downdown by without file ref ": "/download/withoutfilereference"
    })
    
});
 
app.listen(3000, function (req, res) {
    console.log("Server is running at port 3000");
});