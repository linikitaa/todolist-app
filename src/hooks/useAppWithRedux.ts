import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {addTaskAC, changeStatusAC, changeTaskNameAC, removeTaskAC} from "../state/tasks-reducer";
import {addNewTodoAC, changeTodoTitleAC, removeTodolistAC} from "../state/todolists-reducer";
import {v1} from "uuid";
import {TodolistType} from "../types/types";
import {useCallback} from "react";

export const useAppWithRedux = () => {
    let todolist = useSelector<AppRootStateType , Array<TodolistType>>(state=> state.todolist)
    const dispatch = useDispatch()


    const addNewTodo = useCallback((title: string) => {
        let todoListId=v1()
        dispatch(addNewTodoAC(title,todoListId))
    },[])

    return {
        todolist,
        addNewTodo
    }
}