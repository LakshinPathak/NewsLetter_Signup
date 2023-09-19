const express= require("express");
const app= express();
const path=require('path');
const https = require("https");
const bodyParser=require("body-parser");


app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res)
{
   res.sendFile(__dirname +"/signup.html");
});

app.post("/", function(req,res)
{
const em= req.body.ename;
const fname= req.body.passw;
const lname=req.body.passw;

const data={
    members: [
        {
            email_address: em,
            status: "subscribed",
            merge_fields: {
                FNAME: fname,
                LNAME: lname,
            }
        }
    ]
};

var jsonData=JSON.stringify(data);

const url="https://us21.api.mailchimp.com/3.0/lists/ebe406d692";

const options={
    method: "POST",
    auth: "lakshin:bec225bab69e3cfe0bf18f63eced12e7-us21"

}


const request=https.request(url,options, function(response)
{

    if(response.statusCode === 200)
    {
       // res.send("Successfully Subscribed!");
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
        //res.send("There was as error with signing up, please try again!!");  
    }



    response.on("data", function(data)
    {
        console.log(JSON.parse(data));
    })
})

request.write(jsonData); //pass jsondata to mailchimp server
request.end();


});

app.post("/failure", function(req,res)
{
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function ()
{
    console.log("Server is listening on port 3000....");
})

//api key
//bec225bab69e3cfe0bf18f63eced12e7-us21

//list id
//ebe406d692


//Audience list
//https://us21.admin.mailchimp.com/lists/members/#p:1-s:25-sa:last_update_time-so:false