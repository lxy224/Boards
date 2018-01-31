import {connect} from "react-redux";
// import taskSorted from "../actions/taskSorted";
import {inprocess_to_review} from '../actions/inProcess'
import unilityOperation from "../actions/utility"
import Review from '../components/Review'


const getOwnTasks =(tasks,filter)=>{
    return tasks.filter(filterByType(filter));

}
const filterByType = name => tasksArr => {
    return tasksArr.taskStatus.indexOf(name) > -1
};

const mapStateToProps = (state) => ({
    reviewTasks:getOwnTasks(state.tasks,'review'),
})

const mapDispatchToProps = {
    InProcessToReview: inprocess_to_review,
    deleteTask:unilityOperation.delete_task
}
const ReviewContainer = connect(
    mapStateToProps,
    //它的作用就是像它的名字那样，建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。
    mapDispatchToProps
    //用来建立 UI 组件的参数到store.dispatch方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。
)(Review);

export default ReviewContainer