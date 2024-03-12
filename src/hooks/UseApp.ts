import {useAppDispatch, useAppSelector} from "../state/store";
import {TodolistDomainType} from "../state/todolists-reducer";
import {useCallback, useEffect} from "react";
import {addTodoTC, getTodoTC} from "../state/thunks/todolistThunk";

export const UseApp = () => {
    let todolist = useAppSelector<Array<TodolistDomainType>>(state=> state.todolist)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodoTC())
    }, [])


    const addNewTodo = useCallback((title: string) => {
        dispatch(addTodoTC(title))
    },[])

    return {
        todolist,
        addNewTodo
    }
}