const express = require("express"); //loading express library
const fs = require('fs'); //file reading library

//express creating the app
app = express();

//helps read json //middleware
app.use(express.json());

//this helps parse body request data
app.use(express.urlencoded({extended: true}))

//this servers all files in the public folder
//so we don't have to explicily write
app.use(express.static('public'));

//serving files
app.get('/', (req,res)=>{  
    
    //they want this//Users/fauzia/Documents/GitHub/note-taker/public/index.html
    res.sendFile( __dirname + "/public/index.html" )
})


//serving files
app.get('/notes', (req,res)=>{  
    
    res.sendFile( __dirname + "/public/notes.html" )
})

//api routes which is giving and receiving data
//prefix with api
app.get('/api/notes', (req,res)=>{  

//read db.json
fs.readFile('./db/db.json', function (err, data) {
    if (err){ throw err; }

    //convert to string to send
    console.log(data.toString());
    res.send(data.toString())
});
    
    
})

//retrieving data
app.post('/api/notes', (req,res)=>{  
    
    console.log("req",req)
    console.log("whats coming in?", req.body);
    /*
    {
            title: "whatever",
            text: "something"
        }
    */
    fs.readFile('./db/db.json', function (err, data) {
        if (err){ throw err; }

        //read file conver to json
        let targetJSON = JSON.parse(data);

        //we convert to json to give us the ability to push
        //add to the array
        targetJSON.push({
            title: req.body.title,
            text: req.body.text
        })


        let targetString = JSON.stringify(targetJSON);
        fs.writeFile("./db/db.json",targetString, function(){

            console.log("i am done writing");
            res.send("success")
        })
    

      
    });



})

//3000 is port
app.listen(3000, function(){
    //this function gets called when server gets made
    console.log("Server started listening on port 3000")
})
