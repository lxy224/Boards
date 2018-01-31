import api from "./api"
import axios from 'axios';
import { hashHistory } from 'react-router';

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
                if(res.data){
                    // new Promise(function (resolve,reject) {
                    //     resolve(loader.loadAll());
                    // })
                    //   .then(
                    //     hashHistory.push('/')
                    // );
                    // return null;
                    hashHistory.push('/')
                }
                else {
                    hashHistory.push('/login');
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
                if((res.data!==null||res.data!=="")&&res.data.code==="SUC_EMAIL_EXISTS"){
                    // hashHistory.push('/signup');
                }
                else{
                    alert(res.data.message)
                }
                // return res.data[0];
            },
            (error) => {
                throw error.response.data;
            }
        );
}
userActions.singupWithCode= (user)=>{
    return axios
        .post(
            api.user('signup/validation'),
            {user}
        )
        .then(
            (res) => {
                console.log(res);
                // userUtil.set({ email: user.email });
                if((res.data!==null||res.data!=="")){
                    hashHistory.push('/login');
                }
                else {
                    alert("sign up failed");
                    window.location.reload();
                }
            },
            (error) => {
                throw error.response.data;
            }
        );
}
userActions.getAllUsers=()=>{
    return axios
        .post(
            api.user('getUsers'),
        )
        .then(
            (res) => {
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
        );
}

export default userActions;