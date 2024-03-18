import {Dispatch} from "redux";
import {todolistsAPI} from "../../api/todolistss-api";
import {
    addTodoAC,
    changeTodolistEntityStatusAC,
    changeTodoTitleAC,
    removeTodoAC,
    setTodolistsAC
} from "../reducers/todolists-reducer";
import {setAppStatusAC} from "../reducers/app-reducer";
import {handleServerNetworkError} from "../../utils/error-utils";

export const getTodoTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            handleServerNetworkError(error.message, dispatch)
        })
}
export const addTodoTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolists(title)
        .then(res => {
            dispatch(addTodoAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            handleServerNetworkError(error.message, dispatch)
        })
}
export const removeTodoTC = (todoId: string) => (dispatch: Dispatch) => {
    dispatch(changeTodolistEntityStatusAC(todoId, 'loading'))
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.deleteTodolists(todoId)
        .then(res => {
            dispatch(removeTodoAC(todoId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            handleServerNetworkError(error.message, dispatch)
        })
}
export const changeTodoTitleTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolists(todoId, title)
        .then(res => {
            dispatch(changeTodoTitleAC(todoId, title))
        }).catch(error => {
        handleServerNetworkError(error.message, dispatch)
    })
}
