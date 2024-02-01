import {FilterValuesType, TodolistType} from "../AppWithRedux";


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


const initialState: TodolistType[] = []
export const todolistsReducer = (state:TodolistType[]=initialState, action:ActionType):TodolistType[] => {
    switch (action.type) {
        case 'CHANGE-FILTER': {
            return state.map(el=> el.todoId === action.payload.todolistId ? {...el, filter: action.payload.value} : el)
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(el=>el.todoId !== action.payload.todoId)
        }
        case 'CHANGE-TITLE': {
            return state.map(el=> el.todoId === action.payload.todolistId ?{...el, title:action.payload.title} : el)
        }
        case 'ADD-TODO': {
            return [{todoId: action.payload.todoId, title:action.payload.title, filter: "all"}, ...state]
        }
        default: return state
    }
}


