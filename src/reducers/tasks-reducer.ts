import {TasksStateType, TasksType} from "../App";
import {v1} from "uuid";
import {AddNewTodoAC, RemoveTodolistAC} from "./todolists-reducer";


type TasksReducer =
    | RemoveTaskAC
    | ChangeStatusAC
    | AddNewTodoAC
    | ChangeTaskTitleAC
    | AddTaskAC
    | RemoveTodolistAC
type RemoveTaskAC = ReturnType<typeof removeTaskAC>
type ChangeStatusAC = ReturnType<typeof changeStatusAC>
type ChangeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>
type AddTaskAC = ReturnType<typeof addTaskAC>

export const tasksReducer = (state:TasksStateType, action:TasksReducer):TasksStateType=> {
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
        case 'CHANGE-TITLE': {
            return {...state, [action.payload.todoId]: state[action.payload.todoId].map(el=>
                el.taskId === action.payload.taskId ? {...el, title:action.payload.newValue} : el)}
        }
        case 'REMOVE-TODOLIST' : {
            const copyState = {...state}
            delete copyState[action.payload.todoId]
            return copyState
        }
        default: return state
    }
}


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
export const changeTaskTitleAC = (todoId: string, taskId: string, newValue: string)=> {
    return {
        type: 'CHANGE-TITLE',
        payload:{todoId,taskId,newValue}
    } as const
}



// import {TasksStateType} from "../App";
// import {v1} from "uuid";
// import {AddNewTodoAC, RemoveTodolistAC} from "./todolists-reducer";
//
// export const tasksReducer =(state:TasksStateType, action:ActionType):TasksStateType => {
//     switch (action.type) {
//         case 'REMOVE-TASK': {
//             return {...state, [action.todoId]: state[action.todoId].filter(el=> el.taskId !== action.taskId )}
//         }
//         case 'ADD-TASK': {
//             const newTask = {taskId: v1(), title:action.title, isDone: false}
//             return {...state, [action.todoId]: [newTask, ...state[action.todoId]]}
//         }
//         case 'ADD-TODO': {
//             return {...state, [action.todoId]: []}
//         }
//         case 'CHANGE-STATUS': {
//             return {...state, [action.todoId]: state[action.todoId].map(
//                 task=> task.taskId === action.taskId ? {...task, isDone:action.isDone} :task
//                 )}
//         }
//         case 'REMOVE-TODOLIST': {
//             // delete copyState[action.payload.todoId]
//             // let copyState = {...state}
//             // return copyState
//             const {[action.payload.todoId]: [], ...rest}= state
//             return rest
//         }
//         default:return state
//     }
// }
//
// type ActionType = RemoveTaskAC | AddTaskAC | AddNewTodoAC | ChangeStatusAC | RemoveTodolistAC
// type RemoveTaskAC = ReturnType<typeof removeTaskAC>
// type AddTaskAC = ReturnType<typeof addTaskAC>
// type ChangeStatusAC = ReturnType<typeof changeStatusAC>
//
// export const removeTaskAC = (todoId:string, taskId:string) => {
//     return {
//         type:'REMOVE-TASK',todoId,taskId
//     }as const
// }
// export const addTaskAC = (todoId:string, title:string) => {
//     return {
//         type:'ADD-TASK',todoId, title
//     }as const
// }
// export const changeStatusAC = (todoId:string, taskId:string, isDone:boolean) => {
//     return{
//         type:'CHANGE-STATUS', todoId, taskId, isDone
//     }as const
// }
