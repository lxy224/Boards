import {connect} from "react-redux";
// import taskSorted from "../actions/taskSorted";
import {review_to_done} from '../actions/review'
// import openAction from "../actions/open"
import Done from '../components/Done'


const getOwnTasks =(tasks,filter)=>{
    return tasks.filter(filterByType(filter));

}
const filterByType = name => tasksArr => {
    return tasksArr.taskStatus.indexOf(name) > -1
};

const mapStateToProps = (state) => ({
    doneTasks:getOwnTasks(state.tasks,'done'),
})

const mapDispatchToProps = {
    ReviewToDone: review_to_done
}
const DoneContainer = connect(
    mapStateToProps,
    //它的作用就是像它的名字那样，建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。
    mapDispatchToProps
    //用来建立 UI 组件的参数到store.dispatch方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。
)(Done);

export default DoneContainer