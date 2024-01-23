import {TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {newTodoId} from "./todolists-reducer";

export const tasksReducer = (state:TasksStateType, action:tasksReducer):TasksStateType=> {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            // setTasks({...tasks, [todoId]: tasks[todoId].filter(el => el.taskId !== taskId)})
            return {...state, [action.payload.todoId]: state[action.payload.todoId].filter(el=>
                    el.taskId !== action.payload.taskId)}
        }
        case 'ADD-TASK' : {
            // setTasks({...tasks, [todoId]: [newTask, ...tasks[todoId]]})
            let newTask = {taskId: v1(), title:action.payload.title, isDone: false}
            return {...state, [action.payload.todoId]: [newTask, ...state[action.payload.todoId]]}
        }
        case 'CHANGE-STATUS': {
            return {...state, [action.payload.todoId]: state[action.payload.todoId].map(el=>
                el.taskId === action.payload.taskId ? {...el, isDone: !action.payload.isDone} : el)}
        }
        case 'ADD-TODO': {
            let newTodo: TodolistType = {todoId: newTodoId, title:action.payload.title, filter: "all"}
            return {...state, [newTodo.todoId]: []}
        }
        case 'CHANGE-TITLE': {
            return {...state, [action.payload.todoId]: state[action.payload.todoId].map(el=>
                el.taskId === action.payload.taskId ? {...el, title:action.payload.newValue} : el)}
        }
        default: return state
    }
}

type tasksReducer = RemoveTaskAC | AddTaskAC | ChangeStatusAC | AddNewTodoAC | ChangeTaskTitleAC
type RemoveTaskAC = ReturnType<typeof removeTaskAC>
type AddTaskAC = ReturnType<typeof addTaskAC>
type ChangeStatusAC = ReturnType<typeof changeStatusAC>
type AddNewTodoAC = ReturnType<typeof addNewTodoAC>
type ChangeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>
export const removeTaskAC = (taskId: string, todoId: string)=> {
    return {
        type:'REMOVE-TASK',
        payload:{taskId,todoId}
    } as const
}
export const addTaskAC = (todoId: string, title: string)=> {
    return {
        type:'ADD-TASK',
        payload:{todoId,title}
    } as const
}
export const changeStatusAC = (todoId: string, taskId: string, isDone: boolean)=> {
    return {
        type:'CHANGE-STATUS',
        payload:{todoId,taskId,isDone}
    } as const
}
export const addNewTodoAC = (title: string) => {
    return{
        type: 'ADD-TODO',
        payload:{title}
    } as const
}
export const changeTaskTitleAC = (todoId: string, taskId: string, newValue: string)=> {
    return {
        type: 'CHANGE-TITLE',
        payload:{todoId,taskId,newValue}
    } as const
}