import api from "./api"
import axios from 'axios';
import { hashHistory } from 'react-router';
import loader from "./loader"

const userActions = {};

userActions.loginIn = (user) => {
    return axios
        .post(
            api.user('login'),
            {user}
        )
        .then(
            (res) => {
                console.log(res);
                localStorage['username'] = user.username;
                // userUtil.set({ email: user.email });
                if(res.data.length>0){

                    new Promise(function (resolve,reject) {
                        resolve(loader.loadAll())
                    })
                      .then(
                        hashHistory.push('/')
                    )
                    return null;
                }
                else {
                    alert("error username or password, please try again!!")
                }
                return res.data;
            },
            (error) => {
                throw error.response.data;
            }
        );
};
userActions.singUp = (user)=>{
    return axios
        .post(
            api.user('signup'),
            {user}
        )
        .then(
            (res) => {
                console.log(res);
                // userUtil.set({ email: user.email });
                if(res.data!==null||res.data!==""){
                    hashHistory.push('/login');
                }
                if(res.data==="exit"){
                    alert("username has already exited!!")
                }

                return res.data[0];
            },
            (error) => {
                throw error.response.data;
            }
        );
}


export default userActions;