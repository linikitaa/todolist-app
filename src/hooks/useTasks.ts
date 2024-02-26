import {useCallback} from "react";
import {changeStatusAC, changeTaskNameAC, removeTaskAC} from "../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";

export const useTasks = () => {
    const dispatch = useDispatch()

    const onChangeTaskTitle = useCallback((todoId:string,taskId: string, newValue: string) => {
        dispatch(changeTaskNameAC(todoId, taskId, newValue))
    },[])

    const onChangeStatusHandler = useCallback((todoId:string,taskId: string, checked: boolean) => {
        dispatch(changeStatusAC(todoId,taskId, checked))
    },[])

    const removeTaskHandler = useCallback((todoId:string, taskId: string) => {
        dispatch(removeTaskAC(taskId, todoId))
    },[])

    return {
        onChangeTaskTitle,
        onChangeStatusHandler,
        removeTaskHandler
    }
}