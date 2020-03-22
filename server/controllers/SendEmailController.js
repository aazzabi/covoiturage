var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/config');
var global = require('../config/config');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var user = require("../models/User");
const nodemailer = require('nodemailer');

module.exports = {

    sendEmail : function (req,res) {

        var smtpTransport = global.smtpTransport ;

        var mailOptions = {
            from: req.body.from, // sender address
            to:  req.body.to, // list of receivers
            subject: req.body.subject, // Subject line
            text: req.body.text, // plaintext body
            // html: req.body.content // html body
        }
        
        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                console.log(error);
                res.send({
                    success : false,
                    error : "somthing is wrong"
                });
            }else{
                console.log("Message sent: " + response.message);
                res.send({
                    success :true,
                    msg : "send email is done"
                });
            }
        });

    }

}