const express = require('express');
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
    editedDate : Date
});
const Tasks = mongoose.model('tasks',TaskSchema);

const routes = express.Router();
routes.get('/all', (req, res) => {
    Tasks.find({}, (err, doc) => {
        (err) && (res.send(err));
        res.json(doc);
        console.log(doc);
    });
})

module.exports = routes;