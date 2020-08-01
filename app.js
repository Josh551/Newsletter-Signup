const express= require("express");
const https= require("https");
const app= express();
const bodyParser=require("body-parser");
const request = require ("request") ;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const fiNa= req.body.fname;
  const liNa= req.body.lname;
  const eMail=req.body.email;
  const data={
    members:[
      {
      email_address: eMail,
      status:"subscribed",
      merge_fields:{
        FNAME:fiNa,
        LNAME:liNa
      }
    }]
  };
  const jsonData=JSON.stringify(data);
  const url="https://us17.api.mailchimp.com/3.0/lists/c85f1b516a";
  const options= {
    method:"POST",
    auth: "nady1:ed8fe9c7ca1e0e4b052938e0c7cf1038-us17"
}
  const request= https.request(url,options,function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname+"/succcess.html")
    }
    else
    {
      res.sendFile(__dirname+"/failure.html")
    }

    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/");
});
app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running");
});
//api key:730bdeb20b3ca65ae1ec97e07e6692f7-us17
//list id:c85f1b516a
