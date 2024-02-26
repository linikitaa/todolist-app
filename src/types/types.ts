export type TodolistType = {
    todoId: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TasksType[]
}

export type FilterValuesType = "all" | "active" | "completed";

export type TasksType = {
    taskId: string
    title: string
    isDone: boolean
}