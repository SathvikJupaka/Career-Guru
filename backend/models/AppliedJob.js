const mongoose = require('mongoose');
const { Schema } = mongoose;

const AppliedJobSchema = new Schema({
    userId:{
        type: String,
        required: true
    },
    jobId:{
        type: String,
        required: true
    },
    recruiterId:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    appliedOn:{
        type:Date,
        required:true
    }
});
const AppliedJob = mongoose.model('AppliedJobs', AppliedJobSchema);
module.exports = AppliedJob;