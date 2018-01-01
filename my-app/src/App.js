import React, { Component } from 'react';
import loader from './utility/loader';
import { hashHistory } from 'react-router';

// import {Redirect} from "react-router-dom"
import 'purecss';
import 'icono'
import './scss/App.scss';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Header from './components/Header'
import {Boards} from './components/Boards'
export class App extends Component {

    componentDidMount(){
      let username =  localStorage['username'];
      if(username!==null){
          loader.loadAll();
      }
      else {
          hashHistory.push('/login')
      }
    }
  render() {
      // let { location } = this.props;
      // if(location.pathname.includes('login')||location.pathname.includes(status)){
      //   return null;
      // }
      // if(false){
      //     return <Redirect to={ { pathname: '/login' } } />;
      // }
      // else {
      //
      // }
      let username = localStorage['username']
    return (
      <div className="App">
        <Header username={username}/>
          <Boards/>
      </div>
    );
  }
}

// export default App;
export default DragDropContext(HTML5Backend)(App);
