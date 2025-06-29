const mongoose= require("mongoose");
const jobSchema = new mongoose.Schema({
company:String,
country:String,
title:String,
description: String,
skills : [String],
logoURL : String,
workmode: String,
salary:Number,
experience:String
}, { timestamps: true });

module.exports =mongoose.model("jobs",jobSchema)




// const Job = mongoose.model("job", new mongoose.Schema({
//   company: String,
//   country: String,
//   title: String,
//   description: String,
//   skills: [String],
//   logoURL: String,
//   workmode: String,
//   salary: Number,
//   experience: String
// }, { timestamps: true }));
