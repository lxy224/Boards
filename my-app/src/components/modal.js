 import React, { Component } from "react";
 import {dispatch} from "../index";
 import unilityOperation from '../actions/utility'
 import taskActions from "../utility/tasks";
 // import userActions from "../utility/user"
 export default class Modal extends Component{
     constructor(props) {
         super(props);
         this.state = {
             createdUser: this.props.username,
             acceptedUser: "admin",
             taskTitle:"",
             taskContent:"",
             taskType:"testing",
             taskStatus:"open",
             attachment:false,
             _id:""
         };

         this.handleInputChange = this.handleInputChange.bind(this);
     }
     handleUpload = (event) =>{
         let data =new FormData();
         let config = {};
         data.append('name','upload file');
         data.append('file',this.refs.input.files[0]);
         Promise.resolve()
             .then(
                 ()=>(taskActions.upload_task(data, config))
             )
             .then(
                 (taskId)=>{
                     this.setState({
                         attachment:true,
                         _id:taskId
                     })
                 }
             )
             .then(()=>(alert("Upload Success")))
             .catch(()=>(alert("upload failed")))
     }
     handleClickUpload = () =>{
         this.refs.input.click();
     }
     handleInputChange = (event)=>{
         let target = event.target;
         let name = target.name;
         let value =  target.value;
         this.setState({
             [name]:value
         })
     }

     handleSubmit = (event)=>{
         let newTask = this.state;
         for(let key in newTask){
             if(newTask[key]===""&&(key!=="attachment"||key!=="_id")){
                 alert(`${key} is empty`)
                 return
             }
         }
         dispatch(unilityOperation.add_new_task(newTask))

         event.preventDefault();
     }
     // handleGetFile = ()=>{
     //     // taskActions.get_file()
     //     window.open("http://localhost:8009/api/tasks/view")
     // }

     render() {
         return(
                 <div className='modal' style={{display:this.props.displayModal? "block":"none"}}>
                     <div className="modal-header">
                         Add a Task
                     </div>
                     <div className="modal-content">
                         <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>
                             <div className="pure-g">
                                 <div className="pure-u-1-2">
                                     <label htmlFor="createdUser">createdUser</label>
                                     <input onChange={this.handleInputChange} name="createdUser" className="pure-u-23-24" type="text" value={this.props.username} readOnly/>
                                 </div>
                                 <div className="pure-u-1-2">
                                     <label htmlFor="acceptedUser">acceptedUser</label>
                                     <select onChange={this.handleInputChange}  ref = "acceptedUser" name="acceptedUser" className="pure-input-1-2">
                                         <UserSelect users = {this.props.users}/>
                                     </select>
                                 </div>
                             </div>
                             <div className="pure-g">
                                 <div className="pure-u-1-2">
                                     <label htmlFor="taskTitle">taskTitle</label>
                                     <input onChange={this.handleInputChange}  name="taskTitle" className="pure-u-23-24" type="text"/>
                                 </div>
                                 <div className="pure-u-1-2">
                                     <label htmlFor="taskContent">taskContent</label>
                                     <input onChange={this.handleInputChange}  name="taskContent" className="pure-u-23-24" type="text"/>
                                 </div>
                             </div>
                             <div className="pure-g">
                                 <div className="pure-u-1-2">
                                     <label htmlFor="taskType">taskType</label>
                                     <select onChange={this.handleInputChange}  name="taskType" className="pure-input-1-2">
                                         <option value="testing">testing</option>
                                         <option value="develop">develop</option>
                                         <option value="document">document</option>
                                     </select>
                                 </div>
                                 <div className="pure-u-1-2">
                                     <label htmlFor="taskStatus">taskStatus</label>
                                     <select onChange={this.handleInputChange}  name="taskStatus" className="pure-input-1-2">
                                         <option value="open">open</option>
                                         <option value="inProcess">inProcess</option>
                                         <option value="review">review</option>
                                         <option value="done">done</option>
                                     </select>
                                 </div>
                             </div>
                             <div className="pure-g">
                                 <div className="pure-u-1-2">
                                     <label htmlFor="Attachment">Attachment</label>
                                     <input style={{display:"none"}} ref="input" type="file" multiple={ false } onChange={ this.handleUpload.bind(this) }/>
                                     <div className="upload pure-button button-secondary" onClick={ this.handleClickUpload.bind(this) }>Upload New</div>
                                     {/*<a target="_blank" href="http://localhost:8009/api/tasks/view?id=5a71046efd6b0317b700c391">see</a>*/}
                                 </div>
                               </div>
                         </form>

                     </div>
                     <div className="modal-footer">
                         <button className="button-secondary pure-button" onClick={this.handleSubmit.bind(this)}>Submit</button>
                         <button className="pure-button" onClick={()=>dispatch(unilityOperation.display_modal(false))}>Cancel</button>
                     </div>
                 </div>
         )
     }
 }
 export class ModalBackground extends Component{
     render(){
         return(
             <div onClick={()=>dispatch(unilityOperation.display_modal(false))} className="modal-background" style={{display:this.props.displayModal? "block":"none"}}/>
         )
     }
 }

 export class UserSelect extends Component{
     render(){
         let users = this.props.users;
        return(
            users.map((user,index)=>{
                    return <option value={user.username} key={index}>{user.username}</option>
                }
            )
        )
     }
 }