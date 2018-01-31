import React, { Component } from 'react';
import { hashHistory } from 'react-router';

// import {Redirect} from "react-router-dom"
import 'purecss';
import 'icono'
import './scss/App.scss';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import HeaderContainer from './containers/Header'
import {Boards} from './components/Boards'
import object from './utility/object'
import loader from './utility/loader'
export class App extends Component {
    componentDidMount(){
      if (object.handleCookie().length<=0){
          hashHistory.push('/login')
      }
      else {
          loader.loadAll();
      }
    }
  render() {

      let username = localStorage['username']
    return (
      <div className="App">
        <HeaderContainer username={username}/>
          <Boards/>
      </div>
    );
  }
}

// export default App;
export default DragDropContext(HTML5Backend)(App);
