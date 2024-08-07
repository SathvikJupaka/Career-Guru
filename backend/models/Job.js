const mongoose = require('mongoose');
const { Schema } = mongoose;

const JobSchema = new Schema({
    postedBy:{
        type: String,
        required: true
    },
    companyName:{
        type: String,
        required: true,
    },
    companyImageUrl:{
        type: String,
        required: true
    },
    positionName:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    lastDate:{
        type:Date,
        required:true
    },
    aboutJob:{
        type:String,
        required:true
    },
    minQualifications:{
        type:String,
        required:true
    },
    responsibilities:{
        type:String,
        required:true
    },
    ctc:{
        type:String,
        required:true
    }
    ,
    postedOn:{
        type:Date,
        required:true
    }
  });
  const Job = mongoose.model('Jobs', JobSchema);
  module.exports = Job;