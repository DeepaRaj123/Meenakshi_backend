'use strict';

const User = require('../models/user');
var admin = require("firebase-admin");
var serviceAccount = require("../meenakshi-control-system-6ad84-firebase-adminsdk-bmrix-0abfe15422.json");
const jwt = require('jsonwebtoken');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://meenakshi-control-system-6ad84-default-rtdb.asia-southeast1.firebasedatabase.app"
});
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendMessage =async (req, res, next) => {

  try{
    client.messages
      .create({
         from: 'whatsapp:+14155238886',
         body: 'Hello its test!',
         to: 'whatsapp:+918606804105'
       })
      .then(message => res.status(200).json({
        success:true, 
        message: message,
        result:[]
      }));
  }
  catch (err) {
    const errorMessage = err.message;
    res.status(500).json({
        success:false, 
        message: errorMessage,
        result:[]
    }); 
  }
 
}

const postMessage =async (req, res, next) => {

  try{

    if(req.body.from&&req.body.to&&req.body.message){
  

    client.messages
      .create({
         from: 'whatsapp:'+req.body.from,
         body: req.body.message,
         to: 'whatsapp:'+req.body.to
       })
      .then(message => res.status(200).json({
        success:true, 
        message: message,
        result:[]
      }));
    }
    else{
      res.status(500).json({
          success:false, 
          message: 'Body should not be empty/invalid keys passed',
          result:[]
      }); 
    }
  }
  catch (err) {
    const errorMessage = err.message;
    res.status(500).json({
        success:false, 
        message: errorMessage,
        result:[]
    }); 
  }
 
}


const showwelcomeMessage =async (req, res, next) => {
  res.json('This is MeenakshiControlSystem API'); 
}
   
module.exports = {
   sendMessage,
   postMessage,
   showwelcomeMessage
}