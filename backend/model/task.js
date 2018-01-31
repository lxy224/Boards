const mongoose = require('mongoose');
var TaskSchema = new mongoose.Schema( {
    id : String,
    sortedId : Number,
    createdUser : String,
    acceptedUser : String,
    taskTitle : String,
    taskContent : String,
    taskType : String,
    taskStatus : String,
    createDate : Date,
    editedDate : Date,
    attachment : Boolean,
    attachFile : String
});
const model = mongoose.model('tasks',TaskSchema);

module.exports = model