const express = require('express');
const taskModel = require('../model/task')
const taskLib = require('../utility/taskLib')
const responseMessage = require('../library/responseMessage')
const path = require('path')
// const mongoose = require('mongoose');
// var TaskSchema = new mongoose.Schema( {
//     id : String,
//     sortedId : Number,
//     createdUser : String,
//     acceptedUser : String,
//     taskTitle : String,
//     taskContent : String,
//     taskType : String,
//     taskStatus : String,
//     createDate : Date,
//     editedDate : Date
// });
// const Tasks = mongoose.model('tasks',TaskSchema);

const routes = express.Router();
routes.get('/all', (req, res) => {
    taskModel.find({}, (err, doc) => {
        (err) && (res.send(err));
        res.json(doc);
        console.log(doc);
    });
})
routes.post('/operation',(req,res)=>{
    let nextStatus = req.body.nextStatus;
    let id = req.body.task.id;
    taskModel.findOneAndUpdate({'id':id},{$set:{'taskStatus': nextStatus}},(err, docs) => {
        (err) && (res.send(err));
        res.send(docs);

    });

})
routes.post('/search',(req,res)=>{
    let searchContent = req.body.searchContent;
    // taskTitle:/searchContent/,taskContent:/searchContent/
    taskModel.find({$or:[
        {taskType:eval("/"+searchContent+"/i")},
        {taskTitle:eval("/"+searchContent+"/i")}
    ]},(err, docs) => {
        (err) && (res.send(err));
        res.send(docs);

    });

})

routes.get('/taskTypes', (req, res) => {
     Promise.resolve()
         .then(
             ()=>taskLib.getAllTaskTypes()
         )
         .then(
             (taskTypes)=>res.json(taskTypes)
         )
         .catch(
             (err)=>{
                 console.log("get taskTypes failed")
                 res.json(responseMessage.get_taskType_err)
             }
         )
})
routes.post('/insertTask', (req, res) => {
    Promise.resolve()
        .then(()=>
        {
            if(req.body.task._id!==undefined){
                taskLib.updateNewTask(req.body.task)
            }
            else {
                taskLib.insertNewTask(req.body.task)
            }
        }
        )
        .then(
            (task)=>res.json({task})
        )
        .catch(
            (err)=>{
                console.log("insert task failed")
                res.json(responseMessage.get_taskType_err)
            }
        )
})

routes.post('/deleteTask',(req,res) =>{
    Promise.resolve()
        .then(()=>taskLib.deleteTask(req.body.task))
        .then(
            (task)=>res.json({task})
        )
        .catch(
            (err)=>{
                console.log("delete task failed")
                res.json(responseMessage.del_task_err)
            }
        )
})
routes.post('/upload',(req,res,next) =>{
    let taskId='';
    let newTask={};
    Promise.resolve()
        .then(()=>taskLib.insertNewTask({attachment:true}))
        .then((task)=>{
            taskId = task._id;
            newTask =task
            return taskLib.upLoadFile(req,next,taskId)
        })
        .then((target_path)=>(
            taskLib.updateNewTask({...newTask,attachFile:target_path})
        ))
        .then(
            (taskId)=>res.json({"success":taskId})
        )
        .catch((err)=>{
            console.log("upload file failed")
           taskLib.deleteTask({"_id":taskId})
        })

})

routes.get('/view',(req,res,next)=>{
    console.log(req);
    let id = req.query.id;
    Promise.resolve()
        .then(()=>(
            taskLib.findTask(id)
        ))
        .then((task)=>(
            res.sendFile(path.resolve(task.attachFile))
        ))
})
module.exports = routes;