import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers'
import LoginContainer from './containers/login/login'
import SignupContainer from './containers/signup/signup'
import { createStore ,applyMiddleware ,compose} from 'redux'
import { Provider } from 'react-redux'
// import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import thunk from "redux-thunk"
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
// import Modal from "./components/modal"

// function logger({getState}) {
//     return(next)=>(action)=>{
//         console.log('will dispatch', action)
//         // 调用 middleware 链中下一个 middleware 的 dispatch。
//         let returnValue = next(action);
//         console.log('state after dispatch', getState())
//         // 一般会是 action 本身，除非
//         // 后面的 middleware 修改了它。
//         return returnValue
//     }
// }
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    [ 'Use Redux' ],
    // applyMiddleware(logger),]
    composeEnhancers(
        applyMiddleware(thunk)
    )
)
let dispatch = store.dispatch;
export {dispatch}
// ReactDOM.render(
//     <Provider store={store}>
//     <App />
//     </Provider>,
//     document.getElementById('root'));


const Routes = () => {
    return (
        <Provider store={ store }>
            <Router onUpdate={ () => { window.scrollTo(0 ,0); } } history={ hashHistory }>
                <Route path="/">
                    <IndexRoute component={ App }/>
                    {/*<Route exact path="/addTask" component={Modal} />*/}
                    <Route path="/login" component={ LoginContainer } />
                    <Route path="/signup" component={ SignupContainer } />
                </Route>
            </Router>
        </Provider>
    );
};

ReactDOM.render(<Routes/>, document.getElementById('root'));
registerServiceWorker();