import {Dispatch} from "redux";
import {TaskPriorities, TaskStatuses, todolistsAPI, UpdateModelTaskType} from "../../api/todolistss-api";
import {AppRootStateType} from "../store";
import {removeTaskAC, setTaskAC, setTasksAC, updateTaskAC} from "../reducers/tasks-reducer";
import {setAppStatusAC} from "../reducers/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

export const getTasksTC = (todoId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTasks(todoId)
        .then((res) => {
            dispatch(setTasksAC(todoId, res.data.items))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            handleServerNetworkError(error.message, dispatch)
        })
}
export const createTaskTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTask(todoId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error.message, dispatch)
        })

}
export const removeTaskTC = (todoId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todoId, taskId)
        .then(res =>
            dispatch(removeTaskAC(todoId, taskId)))
        .catch(error => {
            handleServerNetworkError(error.message, dispatch)
        })
}
export const updateTaskTC = (todoId: string, taskId: string, domainModel: UpdateDomainModelTaskType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todoId].find(t => t.id === taskId)

        if (!task) {
            console.error("Task not found in state.")
            return
        }

        const apiModel: UpdateModelTaskType = {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status,
            ...domainModel
        }

        todolistsAPI.updateTask(todoId, taskId, apiModel)

            .then((res) => {
                if (res.data.resultCode === 0)
                    dispatch(updateTaskAC(todoId, taskId, domainModel))
                else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error.message, dispatch)
            })
    }


export type UpdateDomainModelTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}