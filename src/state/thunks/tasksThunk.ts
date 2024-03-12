import {Dispatch} from "redux";
import {todolistsAPI, UpdateModelTaskType} from "../../api/todolistss-api";
import {AppRootStateType} from "../store";
import {removeTaskAC, setTaskAC, setTasksAC, updateTaskAC} from "../tasks-reducer";

export const getTasksTC = (todoId: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todoId)
        .then((res) =>
            dispatch(setTasksAC(todoId, res.data.items)))
}
export const createTaskTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todoId, title)
        .then((res) =>
            dispatch(setTaskAC(res.data.data.item)))
}
export const removeTaskTC = (todoId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todoId, taskId).then(res =>
        dispatch(removeTaskAC(todoId, taskId)))
}
export const updateTaskTC = (todoId: string, taskId: string, model:UpdateModelTaskType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todoId].find(t => t.id === taskId)

        if (task) {
            todolistsAPI
                .updateTask(todoId, taskId, {
                    title: model.title,
                    startDate: model.startDate,
                    priority: model.priority,
                    description: model.description,
                    deadline: model.deadline,
                    status: model.status,
                })
                .then((res) => {
                    const action = updateTaskAC(todoId,taskId,model)
                    dispatch(action)
                }).catch((error) => {
                console.error("Error while updating task:", error);
                // Можно добавить действие для обработки ошибки, если это необходимо
            });
        } else {
            console.error("Task not found in state.");
        }


    }