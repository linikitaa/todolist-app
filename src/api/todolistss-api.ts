import axios,{AxiosResponse} from "axios";

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
        return instance.put<ResponseType, AxiosResponse<ResponseType>, {title: string}>(`todo-lists/${id}`, {title: title})
    },
    getTasks(todolistId:string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string,taskId:string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string,title:string) {
        return instance.post<ResponseType<{item:TaskType}>, AxiosResponse<ResponseType<{item:TaskType}>>, {title: string}>(`todo-lists/${todolistId}/tasks/`,{title})
    },
    updateTask(todolistId: string,taskId:string,model:UpdateModelTaskType) {
        return instance.put<ResponseType<{item:TaskType}>, AxiosResponse<ResponseType<{item:TaskType}>>,UpdateModelTaskType>(`todo-lists/${todolistId}/tasks/${taskId}/`,model)
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