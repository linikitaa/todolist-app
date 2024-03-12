// import axios from "axios";
//
// const instance = axios.create({
//     baseURL:'https://social-network.samuraijs.com/api/1.1/todo-lists/',
//     withCredentials: true
// })
//
// export type TodolistsApiType = {
//     id: string
//     addedDate: Date
//     order: number
//     title: string
// }
//
// export type ResponseType<T = {}> = {
//     resultCode: number
//     messages: string[]
//     data: T
// }
//
// type FieldErrorType = {
//     error: string
//     field: string
// }
//
// export const TodolistAPI = {
//     getTodolists() {
//         return instance.get<TodolistsApiType[]>(``)
//     },
//     createTodolist(title:string) {
//         return instance.post<ResponseType<{ item: TodolistsApiType }>>(``,{title})
//     },
//     deleteTodolist(todolistId:string) {
//         return instance.delete<ResponseType>(`${todolistId}`)
//     },
//     updateTodolist(todolistId:string,title:string) {
//         return instance.put<ResponseType>(`${todolistId}`,{title})
//     },
// }
//
// ///////////////
//
// export type TaskApiType = {
//     description: string
//     title: string
//     completed: boolean
//     status: number
//     priority: number
//     startDate: Date
//     deadline: Date
//     id: string
//     todoListId: string
//     order: number
//     addedDate: Date
// }
// export type ResponseTasksType<T = {}> = {
//     totalCount:number
//     error: string
//     items: T
// }
// export const TaskAPI = {
//     getTasks(todolistId:string) {
//         return instance.get<ResponseTasksType<TaskApiType[]>>(`${todolistId}/tasks`)
//     },
//     createTask(todolistId:string,title:string) {
//         return instance.post<ResponseType<{ item: TaskApiType }>>(`${todolistId}/tasks`,{title})
//     },
//     deleteTask(todolistId:string,taskId:string) {
//         return instance.delete<ResponseType>(`${todolistId}/tasks/${taskId}`)
//     },
//     updateTask(todolistId:string,taskId:string,title:string) {
//         return instance.put<ResponseType<{ item: TaskApiType }>>(`${todolistId}/tasks/${taskId}/`,{title})
//     },
// }
//
//




import axios from "axios";

const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})


export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolists(title:string) {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title})
    },
    deleteTodolists(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolists(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
    },
    getTasks(todolistId:string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string,taskId:string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string,title:string) {
        return instance.post<ResponseType<{item:TaskType}>>(`todo-lists/${todolistId}/tasks/`,{title})
    },
    updateTask(todolistId: string,taskId:string,model:UpdateModelTaskType) {
        return instance.put<ResponseType<{item:TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}/`,{model})
    },

}

// types

export type TodolistType = {
    id: string
    "title": string
    "addedDate": string
    "order": number
}
export type ResponseType<D = {}> ={
    resultCode: number
    messages:string[]
    data:D
}
export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items:TaskType[]
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateModelTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}