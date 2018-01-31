import userActions from "../utility/user"
const  initialState = {
    username:"",
    password:""
}
const User = (state = initialState, action)=> {
    switch (action.type) {
        case "LOGIN":
            userActions.loginIn(action.user);
            return {
                ...state,
                username:action.user.username,
                password:action.user.password
            };
        case "SIGNUP":
            userActions.singUp(action.user)
            return{
                ...state,
                username:"",
                password:""
            }
        case "SIGNUPWITHCODE":
            userActions.singupWithCode(action.UserAndCode)
            return{
                ...state,
                username:"",
                password:""
            }
        default:
            return state;
    }
}
export default User