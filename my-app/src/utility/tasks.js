import api from "./api"
import axios from 'axios';
// import { hashHistory } from 'react-router';
// import loader from "./loader"
const taskActions = {};
taskActions.move=(task,nextStatus)=>{
     return axios
        .post(
            api.path('operation'),
            {task,nextStatus}
        )

}
taskActions.getSearchItems = (searchContent)=>{
    return axios
        .post(
            api.path('search'),
            {searchContent}
        )
}
taskActions.getALlItems = ()=>{
    return axios
        .get(api.path('all'))
}
taskActions.deleteTask=(task)=>{
    return axios
        .post(
            api.path('deleteTask'),
            {task}
        )
        .then(
            (res)=>{
                console.log(res);
                if((res.data!==null||res.data!=="")){
                    return res.data
                }
                else {
                    return null;
                }
            },
            (error) => {
                throw error.response.data;
            }
        )
}
taskActions.insertNewTask=(task)=>{
    return axios
        .post(
            api.path('insertTask'),
            {task}
        )
        .then(
            (res)=>{
                console.log(res);
                if((res.data!==null||res.data!=="")){
                    return res.data
                }
                else {
                    return null;
                    // resolve(res.data)
                }
            },
            (error) => {
                throw error.response.data;
            }
        )

}

taskActions.upload_task = (task,config)=>{
    return axios
        .post(
            api.path('upload'),
            task,
            config
        )
        .then(
            (res)=>{
                return res.data.success;
            },
            (err)=>{
                return err;
            }
        )
}
taskActions.get_file = (taskId)=>{
    return axios
        .get(
            api.path('view?id='+taskId),
        )
        .then(
            (res)=>{
                return res.data;
            },
            (err)=>{
                return err;
            }
        )
}

export default taskActions