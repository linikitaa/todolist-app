import {TodolistType} from "../../api/todolistss-api";
import {RequestStatusType} from "./app-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType &{
    filter: FilterValuesType
    entityStatus:RequestStatusType
}


type ChangeFilterAC = ReturnType<typeof changeFilterAC>
export type RemoveTodoAC = ReturnType<typeof removeTodoAC>
type ChangeTodoTitleAC = ReturnType<typeof changeTodoTitleAC>
export type AddTodoAC = ReturnType<typeof addTodoAC>
export type SetTodolistsAC = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistEntityStatusAC = ReturnType<typeof changeTodolistEntityStatusAC>
type ActionType =
    | ChangeFilterAC
    | RemoveTodoAC
    | ChangeTodoTitleAC
    | AddTodoAC
    | SetTodolistsAC
    | ChangeTodolistEntityStatusAC

export const changeFilterAC = (value: FilterValuesType, todolistId: string)=> {
    return {
        type: 'CHANGE-FILTER',
        payload:{
            value,
            todolistId}
    }as const
}
export const removeTodoAC = (todoId:string) => {
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
export const addTodoAC = (todolist: TodolistType) => {
    return{
        type: 'ADD-TODO',
        payload:{todolist}
    } as const
}
export const setTodolistsAC = (todolists:TodolistType[]) => {
    return{
        type: 'SET-TODO',
        payload:{todolists}
    } as const
}
export const changeTodolistEntityStatusAC = (todoId:string, status:RequestStatusType) => {
    return{
        type: 'CHANGE-TODO-ENTITY-STATUS',
        payload:{todoId,status}
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
            return [{...action.payload.todolist, filter:'all', entityStatus:'idle'},...state]
        }
        case 'SET-TODO': {
            return action.payload.todolists.map(el=> ({ ...el, filter:'all' , entityStatus:'idle'}))
        }
        case 'CHANGE-TODO-ENTITY-STATUS': {
            return state.map(el=>el.id ===action.payload.todoId ? {...el,entityStatus:action.payload.status} :el )
        }
        default: return state
    }
}




