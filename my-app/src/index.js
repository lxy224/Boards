import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers'
import LoginContainer from './containers/login/login'
import SignupContainer from './containers/signup/signup'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
// import { HashRouter as Router, Route, Redirect } from 'react-router-dom';

import { HashRouter as Router, Route } from 'react-router-dom';
import { hashHistory } from 'react-router';
import Modal from "./components/modal"


const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
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
                <div>
                    <Route exact path="/" component={ App } />
                    <Route path="/login/" component={ LoginContainer } />
                    <Route path="/signup/" component={ SignupContainer } />

                </div>
            </Router>
        </Provider>
    );
};

ReactDOM.render(<Routes/>, document.getElementById('root'));
registerServiceWorker();