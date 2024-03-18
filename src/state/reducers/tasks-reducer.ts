import {AddTodoAC, RemoveTodoAC, SetTodolistsAC} from "./todolists-reducer";
import {TaskType} from "../../api/todolistss-api";
import {UpdateDomainModelTaskType} from "../thunks/tasksThunk";


export type TasksStateType = {
    [key: string]: TaskType[]
}

type TasksReducer =
    | RemoveTaskAC
    | UpdateTaskAC
    | AddTodoAC
    | RemoveTodoAC
    | SetTodolistsAC
    | SetTasksAC
    | SetTaskAC

type RemoveTaskAC = ReturnType<typeof removeTaskAC>
type UpdateTaskAC = ReturnType<typeof updateTaskAC>
type SetTasksAC = ReturnType<typeof setTasksAC>
type SetTaskAC = ReturnType<typeof setTaskAC>


export const removeTaskAC = (todoId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {todoId, taskId}
    } as const
}
export const updateTaskAC = (todoId: string, taskId: string, model: UpdateDomainModelTaskType) => {
    return {
        type: 'UPDATE-TASK',
        payload: {todoId, taskId, model}
    } as const
}
export const setTasksAC = (todoId: string, tasks: TaskType[]) => {
    return {type: 'SET_TASKS', payload: {tasks, todoId}} as const
}
export const setTaskAC = (task: TaskType) => {
    return {type: 'SET_TASK', task} as const
}


const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: TasksReducer): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].filter(el => el.id !== action.payload.taskId)
            }
        }
        case 'UPDATE-TASK':
            return {...state, [action.payload.todoId]:state[action.payload.todoId]
                    .map((tl)=>  tl.id === action.payload.taskId
                        ? {...tl, ...action.payload.model} : tl)}
        case 'ADD-TODO': {
            return {...state, [action.payload.todolist.id]: []}
        }
        case 'REMOVE-TODOLIST' : {
            const copyState = {...state}
            delete copyState[action.payload.todoId]
            return {...state}
        }
        case 'SET-TODO' : {
            const stateCopy = {...state}
            action.payload.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'SET_TASKS' : {
            return {...state, [action.payload.todoId]: action.payload.tasks}
        }
        case 'SET_TASK': {
            return {...state, [action.task.todoListId]: [action.task,...state[action.task.todoListId]]}
        }
        default:
            return state
    }
}



