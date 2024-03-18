import {useCallback} from "react";
import {TaskStatuses} from "../api/todolistss-api";
import {useAppDispatch} from "../state/store";
import {removeTaskTC, updateTaskTC} from "../state/thunks/tasksThunk";

export const useTasks = () => {
    const dispatch = useAppDispatch()

    const onChangeTaskTitle = useCallback((todoId: string, taskId: string, newTitle: string) => {
        dispatch(updateTaskTC(todoId, taskId,  {title:newTitle}))
    }, [])
    const onChangeStatusHandler = useCallback((todoId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todoId, taskId, {status}))
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