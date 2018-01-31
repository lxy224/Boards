const taskModal = require('../model/task');
const taskTypesModal = require('../model/taskTypes');
const multiparty = require('multiparty')
const responseMessage = require('../library/responseMessage')
const fs = require('fs')
const path = require('path')

const taskLib={};

taskLib.getAllTaskTypes=()=>{
    return new Promise((resolve,reject)=>{
        taskTypesModal
            .find({},{type:true})
            .exec((err,entries)=>{
                console.log("taskTypes fond:", err,entries);
                if(err|| entries.length>0){
                    console.log("get all taskTypes");
                    resolve(entries);
                }
                else{
                    console.log("get all taskTypes failed")
                    reject(err);
                }
            })
    })
}
taskLib.insertNewTask=(task)=>{
    return new Promise((resolve,reject)=>{
        taskModal.insertMany(task,function (err,doc) {
            console.log("insert task",err,doc)
            if(err||doc.length>0){
                resolve(doc[0]._doc)
            }
            else {
                reject(err)
            }
        })
    })
}
taskLib.updateNewTask=(task)=>{
    return new Promise((resolve,reject)=>{
        taskModal.update({_id:task._id},task,function (err,doc) {
            console.log("insert task",err,doc)
            if(err||doc){
                // Object {n: 1,
                //     nModified: 1,
                    // ok: 1}
                resolve(task)
            }
            else {
                reject(err)
            }
        })
    })
}
taskLib.findTask=(id)=>{
    return new Promise((resolve,reject)=>{
        taskModal.find({_id:id},function (err,doc) {
            if(err||doc){
                resolve(doc[0]._doc)
            }
            else {
                reject(err)
            }
        })
    })
}
taskLib.deleteTask = (task)=>{
    return new Promise((resolve,reject)=>{
        taskModal.deleteOne({_id:task._id},function (err,doc) {
            console.log('delete task', err,doc)
            if(err||doc.deletedCount==1){
                resolve(doc.deletedCount)
            }
            else {
                reject(doc.deletedCount)
            }
        })
    })

}
taskLib.upLoadFile = (req,next,task_id) =>{
    // taskLib.insertNewTask({"attachment":true})
    return new Promise((resolve,reject)=>{
        var form = new multiparty.Form();
            // maxFieldsSize - Limits the amount of memory all fields (not files) can allocate in bytes. If this value is exceeded, an error event is emitted. The default size is 2MB.
        form.parse(req, function(err, fields, files){
            if(err){
                if(err.status==413){
                    reject(responseMessage.file_too_large)
                } else {
                    reject(responseMessage.upload_failed)
                }
                return
            }
            let filename = fields.name[0];
            let ext = files['file'][0].path.substring(files['file'][0].path.lastIndexOf('.'));
            let original_path = files['file'][0].path;
            let target_dir = path.resolve('uploads/'+task_id);
            let target_path = target_dir+'/'+filename + ext;
            // if(!(ext === '.pdf' || ext === '.doc' || ext === '.docx')) {
            //     reject(responseMessage.wrong_extension)
            //     return;
            // }
            if(!fs.existsSync( path.resolve('uploads'))){
                fs.mkdirSync(path.resolve('uploads'))
            }

            if(!fs.existsSync(target_dir)) {
                fs.mkdirSync(target_dir);
            }

            fs.renameSync(original_path, target_path);
            resolve('uploads/'+task_id+'/'+filename + ext);
        })
    })
}
taskLib.viewFile = (req,res,next) =>{
    console.log(req);

    return new Promise((resolve,reject)=>{
        res.sendFile(path.resolve('uploads/test/upload file.docx'));
    })
}
module.exports = taskLib