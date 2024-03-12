import {Dispatch} from "redux";
import {todolistsAPI} from "../../api/todolistss-api";
import {addTodoAC, changeTodoTitleAC, removeTodoAC, setTodolistsAC} from "../todolists-reducer";

export const getTodoTC = ()=> (dispatch: Dispatch) => {
    todolistsAPI.getTodolists().then(res => {
        dispatch(setTodolistsAC(res.data))
    })
}
export const addTodoTC = (title:string)=> (dispatch: Dispatch) => {
    todolistsAPI.createTodolists(title).then(res => {
        dispatch(addTodoAC(res.data.data.item))
    })
}
export const removeTodoTC = (todoId:string)=> (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolists(todoId).then(res => {
        dispatch(removeTodoAC(todoId))
    })
}
export const changeTodoTitleTC = (todoId:string,title:string)=> (dispatch: Dispatch) => {
    todolistsAPI.updateTodolists(todoId,title).then(res => {
        dispatch(changeTodoTitleAC(todoId,title))
    })
}
