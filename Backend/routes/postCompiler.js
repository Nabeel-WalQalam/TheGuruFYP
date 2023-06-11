const express = require("express");
const router = express.Router();
// const Question = require("../database/Models/userquestions");
// const User = require("../database/Models/userModel")

var compiler = require('compilex');
var options = {stats : true}; //prints stats on console 
compiler.init(options);

router.post("/", async (req, res) => {
  try {
    // console.log('compiler', req.body.code);
    const {code , languange,userInput} = req.body
    
    
    //  const result = eval(req.body.code);
    

    if(languange == 'c++'){
      if(userInput == ''){
        var envData = { OS : "windows" , cmd : "g++"  , options: {
          timeout: 5000 // Set the timeout value here
        }}; 
        compiler.compileCPP(envData , code , function (data) {
            // res.send(data);
            // console.log('Result:', data);
            
            return res.send({ success: true ,output : data });
            //data.error = error message 
            //data.output = output value
        });
      }else{
        var envData = { OS : "windows" , cmd : "g++"  , options: {
          timeout: 5000 // Set the timeout value here
        }}; 
        compiler.compileCPPWithInput(envData , code , userInput , function (data) {
            // res.send(data);
            // console.log('Result:', data);
            
            return res.send({ success: true ,output : data });
            //data.error = error message 
            //data.output = output value
        });
      }
      
    }else if(languange == 'Python'){
      if(userInput == ''){
        var envData = { OS : "windows"  , options: {
          timeout: 5000 // Set the timeout value here
        }}; 
        compiler.compilePython(envData , code , function (data) {
            // res.send(data);
            // console.log('Result:', data);
            
            return res.send({ success: true ,output : data });
            //data.error = error message 
            //data.output = output value
        });
      }else{
        var envData = { OS : "windows"   , options: {
          timeout: 5000 // Set the timeout value here
        }}; 
        compiler.compilePythonWithInput(envData , code , userInput , function (data) {
            // res.send(data);
            // console.log('Result:', data);
            
            return res.send({ success: true ,output : data });
            //data.error = error message 
            //data.output = output value
        });
      }

    }
    
    

  } catch (error) {
    console.log(error)
    res.send({ success: false, payload: error });
  }
});
module.exports = router;
