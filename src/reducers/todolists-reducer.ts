import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type ChangeFilterAC = ReturnType<typeof changeFilterAC>
type RemoveTodolistAC = ReturnType<typeof removeTodolistAC>
type ChangeTodoTitleAC = ReturnType<typeof changeTodoTitleAC>
type AddNewTodoAC = ReturnType<typeof addNewTodoAC>
type ActionType = ChangeFilterAC | RemoveTodolistAC | ChangeTodoTitleAC | AddNewTodoAC

export const changeFilterAC = (value: FilterValuesType, todolistId: string)=> {
    return {
        type: 'CHANGE-FILTER',
        payload:{
            value,
            todolistId}
    }as const
}
export const removeTodolistAC = (todoId: string) => {
    return{
        type: 'REMOVE-TODOLIST',
        payload:{todoId}
    } as const
}
export const changeTodoTitleAC = (todolistId: string,title: string) => {
    return{
        type: 'CHANGE-TITLE',
        payload:{todolistId,title}
    } as const
}
export const addNewTodoAC = (title: string) => {
    return{
        type: 'ADD-TODO',
        payload:{title}
    } as const
}

export const todolistsReducer = (state:TodolistType[], action:ActionType):TodolistType[] => {
    switch (action.type) {
        case 'CHANGE-FILTER': {
            return state.map(el=> el.todoId === action.payload.todolistId
                ? {...el, filter:action.payload.value} : el)
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(el=>el.todoId !== action.payload.todoId)
        }
        case 'CHANGE-TITLE': {
            return state.map(el=> el.todoId === action.payload.todolistId ?{...el, title:action.payload.title} : el)
        }
        case 'ADD-TODO': {
            let newTodo: TodolistType = {todoId: v1(), title:action.payload.title, filter: "all"}
            return [newTodo, ...state]
        }
        default: return state
    }
}


