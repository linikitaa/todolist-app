import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {addNewTodoAC, TodolistDomainType} from "../state/todolists-reducer";
import {v1} from "uuid";
import {useCallback} from "react";

export const useAppWithRedux = () => {
    let todolist = useSelector<AppRootStateType , Array<TodolistDomainType>>(state=> state.todolist)
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