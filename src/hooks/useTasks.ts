import {useCallback} from "react";
import {TaskPriorities, TaskStatuses} from "../api/todolistss-api";
import {useAppDispatch} from "../state/store";
import {removeTaskTC, updateTaskTC} from "../state/thunks/tasksThunk";

export const useTasks = () => {
    const dispatch = useAppDispatch()

    const onChangeTaskTitle = useCallback((todoId: string, taskId: string, newTitle: string) => {
        dispatch(updateTaskTC(todoId, taskId, {
            title: newTitle,
            description: "",
            status: TaskStatuses.New,
            priority: TaskPriorities.Middle,
            startDate: "",
            deadline: ""
        }))
    }, [])
    const onChangeStatusHandler = useCallback((todoId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todoId, taskId, {
            title: '',
            description: "",
            status,
            priority: TaskPriorities.Middle,
            startDate: "",
            deadline: ""
        }))
    }, [])
    const removeTaskHandler = useCallback((todoId: string, taskId: string) => {
        dispatch(removeTaskTC(todoId, taskId))
    }, [])

    return {
        onChangeTaskTitle,
        onChangeStatusHandler,
        removeTaskHandler
    }
}