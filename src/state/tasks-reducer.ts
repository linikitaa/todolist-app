import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddNewTodoAC, RemoveTodolistAC} from "./todolists-reducer";
import {TasksType} from "../TodolistWithRedux";


type TasksReducer =
    | RemoveTaskAC
    | ChangeStatusAC
    | AddNewTodoAC
    | AddTaskAC
    | RemoveTodolistAC
    | ChangeTaskNameAC
type RemoveTaskAC = ReturnType<typeof removeTaskAC>
type ChangeStatusAC = ReturnType<typeof changeStatusAC>
type AddTaskAC = ReturnType<typeof addTaskAC>
type ChangeTaskNameAC = ReturnType<typeof changeTaskNameAC>



export const removeTaskAC = (taskId: string, todoId: string)=> {
    return {
        type:'REMOVE-TASK',
        payload:{taskId,todoId}
    } as const
}
export const addTaskAC = (todoId:string, title:string) => {
    return {
        type:'ADD-TASK',
        payload:{todoId, title}
    }as const
}
export const changeStatusAC = (todoId: string, taskId: string, isDone: boolean)=> {
    return {
        type:'CHANGE-STATUS',
        payload:{todoId,taskId,isDone}
    } as const
}
export const changeTaskNameAC = (todoId: string, taskId: string, newValue: string)=> {
    return {
        type: 'CHANGE-TASK-NAME',
        payload:{todoId,taskId,newValue}
    } as const
}


const initialState: TasksStateType = {}
export const tasksReducer = (state:TasksStateType = initialState, action:TasksReducer):TasksStateType=> {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            return {...state, [action.payload.todoId]: state[action.payload.todoId].filter(el=> el.taskId !== action.payload.taskId)}
        }
        case 'CHANGE-STATUS': {
            return {...state,[action.payload.todoId]: state[action.payload.todoId].map(el=>
                    el.taskId === action.payload.taskId ? {...el, isDone: action.payload.isDone} : el)}
        }
        case 'ADD-TASK' : {
            let newTask:TasksType = {taskId: v1(), title:action.payload.title, isDone: false}
            return {
                ...state, [action.payload.todoId]: [newTask,...state[action.payload.todoId]]
            }
        }
        case 'ADD-TODO': {
            return {...state, [action.payload.todoId]: []}
        }
        case 'REMOVE-TODOLIST' : {
            const copyState = {...state}
            delete copyState[action.payload.todoId]
            return copyState
        }
        case 'CHANGE-TASK-NAME' : {
            return {...state,[action.payload.todoId]:state[action.payload.todoId].map(el=>el.taskId === action.payload.taskId
                ? {...el, title:action.payload.newValue}
                    : el)}
        }
        default: return state
    }
}
