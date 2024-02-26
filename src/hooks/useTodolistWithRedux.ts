import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {changeFilterAC, changeTodoTitleAC, removeTodolistAC} from "../state/todolists-reducer";
import {FilterValuesType, TasksType} from "../types/types";
import {useCallback} from "react";
import {addTaskAC} from "../state/tasks-reducer";

export const UseTodolistWithRedux = (todoId:string,filter:FilterValuesType) => {
    let tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasks[todoId])
    const dispatch = useDispatch()

    const addNewTask = useCallback( (newTitle:string) => {
        dispatch(addTaskAC(todoId,newTitle))
    },[])

    const onChangeTodoTitle = (newValue: string) => {
        dispatch(changeTodoTitleAC(todoId, newValue))
    }

    const removeTodolistHandler = useCallback(() => {
        dispatch(removeTodolistAC(todoId))
    },[])

    let tasksForTodolist = tasks
    if (filter == "completed") {
        tasksForTodolist = tasks.filter(el => el.isDone)
    }
    if (filter == "active") {
        tasksForTodolist = tasks.filter(el => !el.isDone)
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