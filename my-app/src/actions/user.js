export const login = (user) =>({
    type:"LOGIN",
    user
});
export const signup = (user) =>({
    type:"SIGNUP",
    user
});

export const SignupWithCode = (UserAndCode)=>({
    type:"SIGNUPWITHCODE",
    UserAndCode
})
