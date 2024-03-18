import {AppDispatchType, useAppDispatch, useAppSelector} from "../state/store";
import {
    changeFilterAC,
    FilterValuesType,
} from "../state/reducers/todolists-reducer";
import {useCallback, useEffect} from "react";
import {TaskStatuses, TaskType} from "../api/todolistss-api";
import {createTaskTC, getTasksTC} from "../state/thunks/tasksThunk";
import {changeTodoTitleTC, removeTodoTC} from "../state/thunks/todolistThunk";

export const UseTodolist = (todoId:string,filter:FilterValuesType) => {
    let tasks = useAppSelector<TaskType[]>(state => state.tasks[todoId])
    const dispatch:AppDispatchType = useAppDispatch()

    useEffect(() => {
        dispatch(getTasksTC(todoId))
    }, [])


    const addNewTask = useCallback( (newTitle:string) => {
        dispatch(createTaskTC(todoId,newTitle))
    },[])
    const onChangeTodoTitle = (newValue: string) => {
        dispatch(changeTodoTitleTC(todoId, newValue))
    }
    const removeTodolistHandler = useCallback(() => {
        dispatch(removeTodoTC(todoId))
    },[])

    let tasksForTodolist = tasks
    if (filter == "completed") {
        tasksForTodolist = tasks.filter(el => el.status === TaskStatuses.Completed)
    }
    if (filter == "active") {
        tasksForTodolist = tasks.filter(el => el.status === TaskStatuses.New)
    }

    const onAllClickHandler = useCallback(() =>
        dispatch(changeFilterAC("all", todoId)),[todoId])
    const onActiveClickHandler = useCallback(() =>
        dispatch(changeFilterAC("active", todoId)),[todoId])
    const onCompletedClickHandler = useCallback(() =>
        dispatch(changeFilterAC("completed", todoId)),[todoId])
    return {
        tasksForTodolist,
        onAllClickHandler,
        onActiveClickHandler,
        onCompletedClickHandler,
        addNewTask,
        onChangeTodoTitle,
        removeTodolistHandler,
    }
}