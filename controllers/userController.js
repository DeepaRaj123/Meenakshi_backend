'use strict';

const User = require('../models/user');
var admin = require("firebase-admin");
var serviceAccount = require("../meenakshi-control-system-6ad84-firebase-adminsdk-bmrix-0abfe15422.json");
const jwt = require('jsonwebtoken');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://meenakshi-control-system-6ad84-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const sendMessage =async (req, res, next) => {

    // client.messages
    //   .create({
    //      from: 'whatsapp:+13393298706',
    //      body: 'Hello its test!',
    //      to: 'whatsapp:+918606804105'
    //    })
    //   .then(message => {
    //     res.status(200).json({
    //     success:true, 
    //     message: message,
    //     result:[]
    //   })}).catch(err=>{
    //     console.log(err)
    //     res.status(500).json({
    //       success:false, 
    //       message: err,
    //       result:[]
    //   }); 
    // })
     
    // client.messages 
    //       .create({ 
    //          body: 'hello',  
    //          messagingServiceSid: 'MG7875778953c74038a3faf9b7e65f9389',      
    //          to: '+917907316810' 
    //        }) .then(message => {
    //     res.status(200).json({
    //     success:true, 
    //     message: message,
    //     result:[]
    //   })}).catch(err=>{
    //     console.log(err)
    //     res.status(500).json({
    //       success:false, 
    //       message: err,
    //       result:[]
    //   }); 
    // });
}

const postMessage =async (req, res, next) => {

    const client = require('twilio')(req.body.TWILIO_ACCOUNT_SID, req.body.TWILIO_AUTH_TOKEN);

    if(req.body.messagingServiceSid&&req.body.to&&req.body.message&&req.body.TWILIO_ACCOUNT_SID&&req.body.TWILIO_AUTH_TOKEN){
      client.messages 
          .create({ 
             body: req.body.message,  
             messagingServiceSid: req.body.messagingServiceSid,      
             to: req.body.to,
             TWILIO_ACCOUNT_SID: req.body.TWILIO_ACCOUNT_SID,
             TWILIO_AUTH_TOKEN: req.body.TWILIO_AUTH_TOKEN
      }).then(message => {
            res.status(200).json({
            success:true, 
            message: message,
            result:[]
          })})      .done()

          .catch(err=>{
            console.log(err)
        });
    }
    else{
      res.status(500).json({
          success:false, 
          message: 'Body should not be empty/invalid keys passed',
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