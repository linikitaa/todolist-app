import {TodolistType} from "../api/todolistss-api";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType &{
    filter: FilterValuesType
}


type ChangeFilterAC = ReturnType<typeof changeFilterAC>
export type RemoveTodolistAC = ReturnType<typeof removeTodolistAC>
type ChangeTodoTitleAC = ReturnType<typeof changeTodoTitleAC>
export type AddNewTodoAC = ReturnType<typeof addNewTodoAC>
type ActionType =
    | ChangeFilterAC
    | RemoveTodolistAC
    | ChangeTodoTitleAC
    | AddNewTodoAC

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
export const addNewTodoAC = (title: string,todoId:string) => {
    return{
        type: 'ADD-TODO',
        payload:{title, todoId}
    } as const
}


const initialState: TodolistDomainType[] = []
export const todolistsReducer = (state=initialState, action:ActionType):TodolistDomainType[] => {
    switch (action.type) {
        case 'CHANGE-FILTER': {
            return state.map(el=> el.id === action.payload.todolistId ? {...el, filter: action.payload.value} : el)
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(el=>el.id !== action.payload.todoId)
        }
        case 'CHANGE-TITLE': {
            return state.map(el=> el.id === action.payload.todolistId ?{...el, title:action.payload.title} : el)
        }
        case 'ADD-TODO': {
            return [{id: action.payload.todoId, title:action.payload.title, filter: "all",order:1,addedDate:''}, ...state]
        }
        default: return state
    }
}


