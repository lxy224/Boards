import {connect} from "react-redux";
import {login} from '../../actions/user'
import Login from '../../components/login/login'


const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
    login: login
}
const LoginContainer = connect(
    mapStateToProps,
    //它的作用就是像它的名字那样，建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。
    mapDispatchToProps
    //用来建立 UI 组件的参数到store.dispatch方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。
)(Login);

export default LoginContainer